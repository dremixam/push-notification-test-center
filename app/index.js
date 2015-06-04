var android = require('./android');
var ios = require('./ios');

module.exports = function (app) {
  'use strict';
  app.post('/postAndroid', function (req, res) {
    console.log('demande de push android');
    try {
      android(req.body.apikey, req.body.regid, req.body.collapsekey, req.body.delay, req.body.ttl, function (err, result) {
        if (err) {
          console.error(err);
          res.status(400).send({
            'error': err
          });
        } else {
          console.log('seems ok');
          res.status(200).send({
            'status': result
          });
        }
      });

    } catch (err) {
      console.error(err);
      res.status(400).send({
        'error': err
      });
    }
  });


  app.post('/postiOS', function (req, res) {
    console.log('demande de push iOS : ' + JSON.stringify(req.body));

    try {
      ios(req.body.certfile, req.body.keyfile, req.body.gateway, req.body.port, req.body.token, function (err, result) {
        if (err) {
          console.error(err);
          res.status(400).send({
            'error': err
          });
        } else {
          console.log('seems ok');
          res.status(200).send({
            'status': result
          });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        'error': err
      });
    }
  });





};
