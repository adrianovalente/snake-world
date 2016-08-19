var constants = require('./constants');
var PlayerStatus = constants.PlayerStatus;
var games = require('./gamesController');
var _ = require('lodash');

module.exports = function (id, name, socket) {

  var self = this;

  self.id = id;
  self.name = name;
  self.status = PlayerStatus.IDLE;
  self.socket = socket;
  self.snake = [];
  self.wins = 0;

  self.socket.on('disconnect', function () {
    self.bye();
  })


    self.socket.on('request', function () {
    self.wantsToPlay()
  });

  self.wantsToPlay = function () {
    self.status = PlayerStatus.WAITING;
  }

  self.bye = function () {

    _.forEach(games.all(), function (game) {
      game.onGiveUp(self.id)
    });

    self.status = PlayerStatus.REMOVED;
  }

}