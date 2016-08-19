var express = require('express');
var app = express();
var http = require('http').Server(app);
var uuid = require('node-uuid');
var io = require('socket.io')(http);
var port = process.env.PORT|| 3000;
var players = require('./playersController');
var Player = require('./player')


app.use(express.static('dist'));

app.get('/', function(req, res){
  res.sendFile(require('path').join(__dirname, '/index.html'));
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});


io.on('connection', function(socket){

  var id = uuid.v4();
  console.log('a player connected: ' + id);
  socket.emit('hello', id);

  socket.on('hello', function(data) {
    data = JSON.parse(data);
    players.attach(new Player(data.id, data.name, socket));
  });

});
