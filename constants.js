module.exports = {
  PlayerStatus: {
    IDLE    : 'idle',
    WAITING : 'waiting',
    PLAYING : 'playing',
    REMOVED : 'removed'
  },

  GameStatus: {
    RUNNING: 'running',
    ENDED: 'ended',
    WAITING_TO_BEGIN: 'waiting'
  },

  GAME_VELOCITY: 60,

  scenario: { height: 40, width: 40 }
};