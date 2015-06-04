var apns = require('apns'),
  log4js = require('log4js');

var logger = log4js.getLogger('pushios');
logger.setLevel('DEBUG');

module.exports = function (certfile, keyfile, gateway, port, token, callback) {
  'use strict';
  var options = {
    certData: certfile,
    keyData: keyfile,
    gateway: gateway,
    port: parseInt(port),
    errorCallback: function (errorcode, note) {
      callback(errorcode, note);
    },
    debug: true
  };

  logger.debug('les parametres pour ce qu\'on va envoyer' + JSON.stringify(options));

  var connection = new apns.Connection(options);

  var notification = new apns.Notification();
  notification.payload = {
    'description': 'A good news !'
  };
  notification.badge = 1;
  notification.sound = 'ping.aiff';
  notification.alert = 'Hello World !';
  notification.device = new apns.Device(token);

  connection.sendNotification(notification);
};
