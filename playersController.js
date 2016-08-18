var players = [];
var _ = require('lodash');
var constants = require('./constants');
var games = require('./gamesController');
var PlayerStatus = constants.PlayerStatus;
var Game = require('./game.js');

module.exports = {

  attach: function (player) {
    players.push(player);
    player.wantsToPlay()
  }

}

setInterval(function () {
  players = _.filter(players, function (player) {
    return player.status != 'removed'
  });

  arrangeMatches()

}, 100);

function arrangeMatches() {
  var pendingPlayers = _.filter(players, function (player) {
    return player.status === PlayerStatus.WAITING
  });

  if (pendingPlayers.length > 1) {
    games.attach(new Game(players.pop(), players.pop()));
    arrangeMatches()
  }
}