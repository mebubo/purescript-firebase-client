"use strict"

var firebase = require('firebase')

exports.initializeApp = function (options) {
  return function() {
    firebase.initializeApp(options)
  }
}