'use strict';

var _ = require('lodash');
var fs = require("fs");
var marked = require("marked"); // https://github.com/chjj/marked


// Get list of descriptions
exports.index = function(req, res) {
  var about = "Default description. I should come up with 2 paragraphs of quality text to describe why am I doing all this, and that this all will benefit society tremendously.";
  res.json({desc: about});
};
