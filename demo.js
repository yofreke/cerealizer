'use strict';
const cerealizer = require('./cerealizer');


let testObj = {};
testObj.func1 = function() { console.log('test'); };
testObj.func2 = function() { console.log('var1 is', this.var1); };
testObj.func3 = function(arg1) { return this.var2.push(arg1); };
testObj.var1 = 'jazzhands';
testObj.var2 = [1, 4, 6];
testObj.evilFunc = function() { console.log('Evil Evil Evil.  Process is:', process, '\nThis is:', this); }

console.log('Original object is:', testObj);


console.log('\n\n');


let cereal = cerealizer.convertToText(testObj);
console.log('Cereal result:', cereal);

cerealizer.convertFromText(cereal, function(newObj) {

  console.log('New object is:', newObj);

  newObj.func1();
  newObj.func2();
  let n = newObj.func3(999);
  console.log('n', n, newObj.var2);

  newObj.evilFunc();

});
