'use strict';
const PORT = process.env.PORT || 3000;

const io = require('socket.io')(PORT);



const caps = io.of('/caps');
caps.on('connection',socket=>{
  console.log('Connected: '+socket.id);

  socket.on('join', room=>{
    socket.join(room);
    console.log('Joined the room: ' + room);
  });

  socket.on('pickup', order=>{
    io.emit(order);
    let time = new Date();
    order.time = time;
    console.log('EVENT',order);
    caps.emit('pickup',order);
  });

  socket.on('in-transit', order=>{
    let time = new Date();
    order.time = time;
    console.log('EVENT',order);
    caps.to(order.storeName).emit('in-transit',order);
  });

  socket.on('delivered',order=>{
    let time = new Date();
    order.time = time;
    console.log('EVENT',order);
    caps.to(order.storeName).emit('delivered',order);
  });
});