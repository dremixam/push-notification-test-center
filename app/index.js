var android = require('./android');
var ios = require('./ios');
var fs = require('fs');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = function (app) {
  app.post('/postAndroid', function (req, res) {
    console.log('demande de push android')
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

    var keyfile = makeid();
    var certfile = makeid();

    fs.writeFileSync('./tmp/' + keyfile, req.body.keyfile);

    fs.writeFileSync('./tmp/' + certfile, req.body.certfile);

    try {

      ios('./tmp/' + certfile, './tmp/' + keyfile, req.body.gateway, req.body.port, req.body.token, function (err, result) {
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

        fs.unlink('./tmp/' + certfile, function () {});
        fs.unlink('./tmp/' + keyfile, function () {});
      });



    } catch (err) {
      console.error(err);
      res.status(400).send({
        'error': err
      });
    }
  });





}
