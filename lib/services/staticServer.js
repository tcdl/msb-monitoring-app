'use strict';
var fs = require('fs');
var path = require('path');
var mime = require('mime-types')
var publicPath = path.resolve(__dirname, '../../public');

exports.serve = function(req, res, next) {
  var filePath = sanitize(publicPath + req.url);

  fs.readFile(filePath, function(err, data) {
    if (err && err.code == 'ENOENT') {
      res.writeHead(404);
      res.end();
      return;
    }
    if (err) return next(err);

    res.writeHead(200, {
      'content-type': mime.lookup(req.url) || 'application/octet-stream'
    });
    res.end(data);
  });
};

function sanitize(path) {
  return path.replace(/(\~\/|\.\/|\.\.\/)/g, '');
}
