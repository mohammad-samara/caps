'use strict';

//main hub app//

//pub => emits/fires events
/**
 * * manages the state of every package
 * --> ready for pickup
 * --> in-transite
 * --> delivered
 * * logs every event to the console with 
 * --> a timestamp
 * --> the event payload
 */

const events = require('./events');
require('./vendor');
require('./driver');
events.on('pickup', (payload) => logger(payload, 'pickup'));
events.on('in-transit', (payload) => logger(payload, 'in-transit'));
events.on('delivered', (payload) => logger(payload, 'delivered'));

/**
 * logs every event to the console with a timestamp and the event payload
 * @param {string} event 
 * @param {object} payload 
 */

function logger(event, payload){
  let time = new Date();
  console.log('Event',{event, time, payload});
}