'use strict';
var msb = require('msb');
var config = require('../config');
var staticServer = require('./services/staticServer');

var handler = msb.Responder.createServer({
  namespace: config.staticTopic
})
.use(function(req, res, next) {
  staticServer.serve(req, res, next);
});

// Start if this module is loaded first
if (!module.parent) { handler.listen(); }

module.exports = handler;
