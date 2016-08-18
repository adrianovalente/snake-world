module.exports = function (playerA, playerB) {
  var self = this;

  self.playerA = playerA;
  self.playerB = playerB;

  self.toString = function () {
    return self.playerA.name + ' versus ' + self.playerB.name;
  }

}