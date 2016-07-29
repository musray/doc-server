'use strict'
const mongoose = require('mongoose');

// mongoose schema for an entry of 
// IED document.
let Schema = new mongoose.Schema({
  index: { type: String, required: true },
  index_short: { type: String },
  title: { type: String, required: true },
  rev: { type: String, required: true }
});

module.exports = Schema;
