var games = []

module.exports = {
  attach: function (game) {
    games.push(game);

    console.log('new game! ' + game.toString())

  },

  all: function () {
    return games;
  }
}