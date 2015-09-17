'use strict';
var msb = require('msb');
var config = require('../config');
var channelMonitor = require('./services/channelMonitor');

var handler = msb.Responder.createServer({
  namespace: config.statusTopic
})
.use(function(req, res, next) {
  var docs = (req.query && req.query.topic) ? channelMonitor.statusForTopic(req.query.topic) : channelMonitor.statusForAll();
  var services = channelMonitor.servicesForStatusDocs(docs);

  res.writeHead(200);
  res.end({
    docs: docs,
    extras: {
      services: services
    }
  });
});

// Start if this module is loaded first
if (!module.parent) { handler.listen(); }

module.exports = handler;
