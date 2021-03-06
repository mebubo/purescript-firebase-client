'use strict'

var firebase = require('firebase')

exports.onValue = function (path) {
  return function (callback) {
    return function () {
      var ref = firebase.database().ref(path)
      var token = ref.on('value', function (value) {
        callback(value.val())()
      })
      return function () {
        ref.off('value', token)
      }
    }
  }
}

exports.write = function (path) {
    return function (value) {
        return function () {
            var ref = firebase.database().ref(path)
            ref.set(value)
        }
    }
}

exports.push = function (path) {
  return function (value) {
    return function () {
      var newRef = firebase.database().ref(path).push()
      newRef.set(value)
    }
  }
}