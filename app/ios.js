var apns = require('apns'),
  log4js = require('log4js');

var logger = log4js.getLogger('pushios');
logger.setLevel('DEBUG');

module.exports = function (certfile, keyfile, gateway, port, token, errorCallback) {
  'use strict';

  var options = {
    certData: certfile,
    keyData: keyfile,
    gateway: gateway,
    port: parseInt(port),
    errorCallback: function (errorcode, note) {
      errorCallback({
        'code': errorcode,
        'note': note
      });
    },
    debug: true
  };

  var connection = new apns.Connection(options);

  var notification = new apns.Notification();
  notification.badge = 1;
  notification.sound = 'ping.aiff';
  notification.alert = 'Hello World !';
  notification.device = new apns.Device(token);

  connection.sendNotification(notification);

};
