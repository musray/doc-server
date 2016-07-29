'use strict'
const mongoose = require('mongoose'),
      _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/dmo');

  var Doc = 
    mongoose.model('ied', require('./doc-schema'), 'ied');

  var models = {
    Doc: Doc
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
