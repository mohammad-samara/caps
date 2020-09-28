'use strict';
//vendor module//

/**
 * * declare store name (in .env)
 * * simulate a new customer order every 5 sec's
 * --> create a fake order obj {storeName, orderId, customerName, adress}
 * --> emit a pickup event, with the fake order as payload
 * * monitor the system for events
 * --> console log "Thank you" statement when a delivered event occurs
 */

// everything will fall in here
require('dotenv').config();
const events = require('./events');
const faker = require('faker');
events.on('delivered', payload =>  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`));
// user fake order every 5 min==>
setInterval(function(){events.emit('pickup', {
  storeName:process.env.storeName || 'samaraStore',
  customerName:faker.name.findName(),
  address:faker.address.streetAddress(),
  orderId:faker.random.uuid(),
});},5000);