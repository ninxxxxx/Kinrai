var io = require("socket.io");

var socket = io('http://172.30.230.103:8080/');

socket.emit('hello', "it's me");