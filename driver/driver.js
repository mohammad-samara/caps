'use strict';
require('dotenv').config();
const net = require('net');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const client = new net.Socket();

client.connect(PORT,HOST , ()=>console.log(`Driver is up on ${HOST}:${PORT} `));

client.on('data',(data)=>dataParser(data));

client.on('error',(e)=>{
  console.log('Error: ' + e);
});


function dataParser(data){
  let recievedObj = JSON.parse(data.toString());
  if (recievedObj.event === 'pickup'){
    pickup(recievedObj);
  }
}


function pickup(order){
  setTimeout(()=>{
    order.event = 'in-transit';
    let inTransit = JSON.stringify(order);
    console.log(`Picking up order: ${order.payload.orderId}`);
    client.write(inTransit);
  },1000);
  setTimeout(()=>{
    order.event = 'delivered';
    let delivered = JSON.stringify(order);
    console.log('Delivered order: ' + order.payload.orderId);
    client.write(delivered);
  },3000);
}