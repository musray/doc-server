'use strict'
const
  express = require('express'),
  cors = require('cors'),
  status = require('http-status');

module.exports = function(wagner) {
  var api = express.Router();

  api.get('/document/index/:index', cors(), wagner.invoke(function(Doc) {
    return function(req, res) {
      Doc.findOne({ index: req.params.index }, function(err, doc) {
        console.log(req.param.index);
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

  return api;
};
