const fs = require('fs');
const { getClient } = require('./db.module.js');

test('ensures client is returned', () => {
    expect(getClient()).not.toBeNull();
    //expect(sum(1, 2)).toEqual(3);
  });





