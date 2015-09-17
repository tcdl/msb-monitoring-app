var _ = require('lodash');
var http2bus = require('msb-http2bus');

var routes = exports;

var agent;

routes.load = function(config) {
  agent = http2bus.routesAgent.create(config);
  agent.load(_.select(config.routes, function(route) {
    return route.http;
  }));
  agent.start();
  return agent;
};
