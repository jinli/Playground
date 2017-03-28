
let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let zmq = require('zeromq');

let port = 3000;

server.listen(port, () => {
    console.log('listening on: ' + port)
});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    socket.emit('news', {hello:'world'});
})

let subscriber = zmq.socket('sub')

subscriber.on("message", function(reply) {
  console.log('Received message: ', reply.toString());
})

subscriber.connect("tcp://localhost:8688")
subscriber.subscribe("")

process.on('SIGINT', function() {
  subscriber.close()
  console.log('\nClosed')
  process.exit();
})
