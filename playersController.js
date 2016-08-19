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

    var player1 = pendingPlayers.pop();
    var player2 = pendingPlayers.pop();

    player1.status = PlayerStatus.PLAYING;
    player2.status = PlayerStatus.PLAYING;

    games.attach(new Game(player1, player2));
    arrangeMatches()
  }
}