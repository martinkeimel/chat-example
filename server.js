var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('chat message', socket.handshake.query.nick + ' has connected');  

  socket.on('chat message', function(msg){
		socket.broadcast.emit('chat message', msg.nick + " says " + msg.message);
  });
  
  socket.on('disconnect', function() {
	socket.broadcast.emit('chat message', socket.handshake.query.nick + ' has disconnected');
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
