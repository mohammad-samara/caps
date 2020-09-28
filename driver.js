'use strict';
//drivers module//

/**
 * * monitore the system for events
 * * on pick-up event:-
 * --> after 1 sec. :
 *  - console log ("DRIVER: picked up <orderId>")
 *  - emit in-transite event with the received payload
 * --> after 3 sec's:
 *  - console log "DRIVER: delivered <payload.orderId>"
 *  - emit a delivered event with the same payload (received payload)
 */
const events = require('./events');

//monitoring delivery events
events.on('pickup', payload => pickupHandler(payload));

/**
 * callback when pickup event fires to log the status and emit in-transit event then emits the delivered event
 * @param {object} payload 
 */
function pickupHandler(payload){
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload); 
  }, 1000);

  setTimeout(()=> {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    events.emit('delivered', payload);
  },3000); 
}