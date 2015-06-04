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
      var error = false;
      ios(req.body.certfile, req.body.keyfile, req.body.gateway, req.body.port, req.body.token, function (e) {
        error = true;
        res.status(400).send({
          'error': e
        });
      });
    } catch (err) {
      error = true;
      console.error(err);
      res.status(400).send({
        'error': err
      });
    } finally {
      //This is not a good way to manage this, but I didn't find better
      setTimeout(function () {
        if (!error) {
          res.status(200).send({
            'status': {
              'success': 1
            }
          });
        }
      }, 5000);

    }
  });





};
