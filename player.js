var constants = require('./constants');
var PlayerStatus = constants.PlayerStatus;

module.exports = function (id, name, socket) {

  var self = this;

  self.id = id;
  self.name = name;
  self.status = PlayerStatus.IDLE;
  self.socket = socket;

  self.wantsToPlay = function () {
    self.status = PlayerStatus.WAITING;
  }

  self.bye = function () {
    self.status = PlayerStatus.REMOVED;
  }

}