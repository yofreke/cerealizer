'use strict';
const Sandbox = require('sandbox');

// http://stackoverflow.com/a/18368918
module.exports.convertToText = function (obj) {
  //create an array that will later be joined into a string.
  let parts = [];

  //is object
  //  Both arrays and objects seem to return 'object'
  //  when typeof(obj) is applied to them. So instead
  //  I am checking to see if they have the property
  //  join, which normal objects don't have but
  //  arrays do.
  if (obj === undefined) {
    return String(obj);
  }

  if (typeof(obj) === 'object' && (obj.join === undefined)) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        parts.push(prop + ': ' + module.exports.convertToText(obj[prop]));
      }
    }
    return '{' + parts.join(',') + '}';
  }

  if (typeof(obj) === 'object' && obj.join !== undefined) {
    //is array
    for (let prop in obj) {
      parts.push(module.exports.convertToText(obj[prop]));
    }
    return '[' + parts.join(',') + ']';
  }

  if (typeof(obj) === 'function') {
    //is function
    parts.push(obj.toString());
  } else {
    //all other values can be done with JSON.stringify
    parts.push(JSON.stringify(obj));
  }

  return parts.join(',');
};

module.exports.convertFromText = function(s, cb) {
  cb(eval('(' + s + ')'));

  // TODO: proper sandboxing
  // Allow some
  // let sandbox = {
  //   module: undefined,
  //   exports: undefined,

  //   cb: undefined,

  //   console: console
  // };
  // // Disallow the rest
  // Object.keys(global).forEach(key => {
  //   if (!sandbox[key]) {
  //     sandbox[key] = undefined;
  //   }
  // });

  // (function() {
  //   let safeCB = function(newObj) {
  //     cb.call({}, newObj);
  //     return undefined;
  //   };

  //   with (sandbox) {
  //     safeCB(eval('(' + s + ')'));
  //   }
  // })();
};
