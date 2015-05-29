var apn = require('apn'),
  gcm = require('node-gcm'),
  log4js = require('log4js');

var logger = log4js.getLogger('push');
logger.setLevel('DEBUG');

module.exports = function (APIKey, regIds, collapseKey, delayWhileIdle, ttl, callback) {
  var message = new gcm.Message();

  var message = new gcm.Message({
    collapseKey: collapseKey,
    delayWhileIdle: delayWhileIdle,
    timeToLive: parseInt(ttl),
    data: {
      'message': 'test'
    }
  });

  var sender = new gcm.Sender(APIKey);

  sender.send(message, regIds, function (err, result) {
    callback(err, result);
  });
}
