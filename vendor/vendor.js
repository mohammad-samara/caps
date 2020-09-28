'use strict';
require('dotenv').config();
const net = require('net');
const faker = require('faker');
const STORE_NAME = process.env.STORE_NAME || 'Ammar Store';

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=> {console.log(`${STORE_NAME} got connected on ${HOST}:${PORT}`)});

const orders = [];

client.on('data',function(data){
  let recievedObj = JSON.parse(data);
  if (recievedObj.event === 'delivered'){
    console.log(`Thank you for delivering ${recievedObj.payload.orderId}`);
  }
})

setInterval(()=>{
    makeOrder();
},5000);


function makeOrder(){
    let order = {
        storeName: STORE_NAME,
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