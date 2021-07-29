//client.js
var io = require('socket.io-client');
var socket1 = io.connect('http://192.168.1.6:5000', { reconnect: true });

// Add a connect listener
socket1.on('connect', function () {
    console.log('Socket 1 Connected!');
    socket1.emit('join', { usertype: 'waiter' });
});
socket1.on('joinmessage', (data) => {
    console.log("socket1",data)
});

var socket2 = io.connect('http://192.168.1.6:5000', { reconnect: true });

// Add a connect listener
socket2.on('connect', function () {
    console.log('Socket 2 Connected!');
    socket2.emit('join', { usertype: 'waiter' });
});
socket2.on('joinmessage', (data) => {
    console.log("socket2",data)
});

var exe = io.connect('http://192.168.1.6:5000', { reconnect: true });

// Add a connect listener
exe.on('connect', function () {
    console.log('Socket 2 Connected!');
    exe.emit('join', { usertype: 'exe' });
});
exe.on('joinmessage', (data) => {
    console.log("exe",data)
});