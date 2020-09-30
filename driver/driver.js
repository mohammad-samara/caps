'use strict';
require('dotenv').config();

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

socket.emit('join','driver' );
socket.on('pickup', (payload)=>{
  setTimeout(()=>{
    console.log('Picked up ' + payload.orderId);
    socket.emit('in-transit',payload);
  },1500);

  setTimeout(()=>{
    console.log('Delivered ' + payload.orderId);
    socket.emit('delivered',payload);
  },3000);
});