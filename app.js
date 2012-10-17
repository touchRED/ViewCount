var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , me = 'A bucket of awesome'
  , users = 0;

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/socket.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading socket.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  users++;
  setInterval(function(){
    socket.emit('counter', users);
  }, 30);
  socket.on('disconnect', function () {
    users--;
  });
});

