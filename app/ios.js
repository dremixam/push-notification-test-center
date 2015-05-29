var apn = require('apn'),
  log4js = require('log4js');

var logger = log4js.getLogger('pushios');
logger.setLevel('DEBUG');


var errorHappened = function (errorcode, note) {

}

module.exports = function (certfile, keyfile, gateway, port, token, callback) {

  if (gateway === 'gateway.push.apple.com') {
    process.env.NODE_ENV = 'production';
  } else {
    delete process.env.NODE_ENV;
  }


  var options = {
    cert: certfile,
    key: keyfile,
    gateway: gateway,
    port: parseInt(port),
    enhanced: true,
    errorCallback: function (errorcode, note) {
      callback(errorcode, note);
    },
    cacheLength: 10,
    batchFeedback: true,
  };
  var apnConnection = new apn.Connection(options);

  var feedback = new apn.Feedback(options);
  feedback.on("feedback", function (devices) {
    devices.forEach(function (item) {
      callback(null, item);
    });
  });



  var myDevice = new apn.Device(token);
  var note = new apn.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = "\uD83D\uDCE7 \u2709 Test";
  note.payload = {
    'messageFrom': 'Push notification test center'
  };
  apnConnection.pushNotification(note, myDevice);
}
