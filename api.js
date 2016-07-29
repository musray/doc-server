'use strict'
const
  express = require('express'),
  status = require('http-status');

module.exports = function(wagner) {
  var api = express.Router();

  api.get('/document/index/:index', wagner.invoke(function(Doc) {
    return function(req, res) {
      Doc.findOne({ index: req.param.index }, function(err, doc) {
        if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() });
        }
        if (!doc) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not Found' });
        }
        res.json({ doc: doc });
      });
    };
  }));
};
