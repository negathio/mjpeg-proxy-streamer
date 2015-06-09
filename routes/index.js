var express = require('express');
var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var router = express.Router();


var streams = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', streams: streams });
});

router.post('/', function(req, res, next) {
  var mjpegUrl = req.body.streamPath;

  var mjpegProxy = new MjpegProxy(mjpegUrl);

  streams.push(mjpegProxy);

  router.get('/stream/' + (streams.length - 1), mjpegProxy.proxyRequest);

  res.redirect("/");
});

router.get('/show/stream/:index', function(req, res, next) {
  res.render('show', { streamUrl: '/stream/' + req.params.index});
});

module.exports = router;
