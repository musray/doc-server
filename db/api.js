'use strict'
const
  express = require('expres'),
  status = require('http-status');

module.exports = function(wagner) {
  var api = express.Router();

  api.get('/document/index/:index', wagner.invoke(function(Category) {
    return function(req, res) {
      Category.findOne({ index: req.query.index_19 }, function(err, category) {
        if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() });
        }
        if (!category) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not Found' });
        }
        res.json({ category: category });
      });
    };
  }));
};
