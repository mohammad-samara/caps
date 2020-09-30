'use strict';
require('dotenv').config();
const faker = require('faker');
const storeName = process.env.storeName || 'Samara Store';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

socket.emit('join',storeName);

socket.on('delivered', payload=>{
  console.log(`Thank you for delivering ${payload.orderId}`);
});


setInterval(()=>{
  let order = {
    storeName: storeName,
    orderId: faker.random.uuid(),
    customerName: faker.name.firstName(),
    address: faker.address.streetAddress(),
  };
  socket.emit('pickup', order);
},5000);
