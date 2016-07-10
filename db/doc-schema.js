'use strict'
const mongoose = require('mongoose');

let RevisionSchema = new mongoose.Schema({
  rev: String,
  status: String,
  date: Date,
  draft: String,
  check: String,
  review: String,
  approve: String,
  draft_e: String,
  check_e: String,
  review_e: String,
  approve_e: String
});

let DocSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  index_shrot: String,
  category: { type: String, required: true },
  revisions: [ RevisionSchema ] 
});



module.exports = DocSchema;
// module.exports.DocList = DocList;
