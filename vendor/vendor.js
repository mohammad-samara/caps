'use strict';
require('dotenv').config();
const net = require('net');
const faker = require('faker');
const storeName = process.env.storeName || 'Samara Store';

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=> {console.log(`${storeName} got connected on ${HOST}:${PORT}`)});


client.on('data',function(data){
  let recievedObj = JSON.parse(data);
  if (recievedObj.event === 'delivered'){
    console.log(`Thank you for delivering ${recievedObj.payload.orderId}`);
  }
})

client.on('close', function () {
    console.log("CAPS (main server) connection is closed");
});

setInterval(()=>{
    makeOrder();
},5000);


function makeOrder(){
    let order = {
        storeName: storeName,
        orderId: faker.random.uuid(),
        customerName: faker.name.firstName(),
        address: faker.address.streetAddress(),
      };
    let event = JSON.stringify({event:'pickup', payload: order})
    client.write(event);
}

client.on('error',(e)=>{
  console.log('Error recieved: ' + e);
});