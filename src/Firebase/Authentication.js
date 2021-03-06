'use strict'

var firebase = require('firebase')

var Control_Monad_Aff = require('../Control.Monad.Aff')
var Data_Maybe = require('../Data.Maybe')

/*----------------------------------------------------------------------------*/

exports.newEmailProvider = function () {
  return new firebase.auth.EmailAuthProvider()
}

exports.newFacebookProvider = function () {
  return new firebase.auth.FacebookAuthProvider()
}

exports.newGitHubProvider = function () {
  return new firebase.auth.GithubAuthProvider()
}

exports.newGoogleProvider = function () {
  return new firebase.auth.GoogleAuthProvider()
}

exports.newTwitterProvider = function () {
  return new firebase.auth.TwitterAuthProvider()
}

exports.addScope = function (provider) {
  return function (scope) {
    return function () {
      provider.addScope(scope)
    }
  }
}

exports.signInWithPopup = function (provider) {
  return function (onSuccess, onError) {
    firebase.auth().signInWithPopup(provider)
      .then(function (response) { onSuccess({}) })
      .catch(function (error) { onError(error) })
    return Control_Monad_Aff.nonCanceler
  }
}

exports.onAuthStateChanged = function (callback) {
  return function () {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        callback(true)()
      } else {
        callback(false)()
      }
    })
  }
}

exports.signOut = function() {
  firebase.auth().signOut()
}

/*----------------------------------------------------------------------------*/

var nullToNothing = function (value) {
    return (value === null) ? Data_Maybe.Nothing.value : new Data_Maybe.Just(value)
}

exports.userID = function(user) {
  return user.uid;
};

exports.userDisplayName = function(user) {
  return nullToNothing(user.displayName)
}

exports.userEmail = function(user) {
  return nullToNothing(user.email)
}

exports.currentUser = function() {
  var user = firebase.auth().currentUser
  return nullToNothing(user)
}
