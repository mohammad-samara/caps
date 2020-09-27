'use strict';
require('../caps');
jest.spyOn(global.console, 'log');
const events = require('../events');

describe('anyThing', ()=> {
  it('console should not been run when emit anyThing', ()=> {   
    events.emit('anyThing', {
      storeName:'process.env.storeName',
      customerName:'faker.name.findName()',
      address:'faker.address.streetAddress()',
      id:'faker.random.number()',
    });
    expect(console.log).not.toHaveBeenCalled();  
  });
});

describe('pickup', ()=> {
  it('console should be run when emit pickup', ()=> {   
    events.emit('pickup', {
      storeName:'process.env.storeName',
      customerName:'faker.name.findName()',
      address:'faker.address.streetAddress()',
      id:'faker.random.number()',
    });
    expect(console.log).toHaveBeenCalled();
  });
  
});

describe('transit', ()=> {
  it('console should be run when emit transit', ()=> {   
    events.emit('transit', {
      storeName:'process.env.storeName',
      customerName:'faker.name.findName()',
      address:'faker.address.streetAddress()',
      id:'faker.random.number()',
    });
    expect(console.log).toHaveBeenCalled();  
  });
  
});

describe('delivered', ()=> {
  it('console should be run when emit delivered', ()=> {   
    events.emit('delivered', {
      storeName:'process.env.storeName',
      customerName:'faker.name.findName()',
      address:'faker.address.streetAddress()',
      id:'faker.random.number()',
    });
    expect(console.log).toHaveBeenCalled();  
  });
});