"use strict";

export function isBoolean(arg) {
  return typeof arg === 'boolean';
}

export function bind(fn, ...args) {
  return function(...args2) {
    return fn(...[...args, ...args2]);
  };
};

export function sequence(...fns) {
  return function(...args) {
    let res = fns[0](...args);
    for (var i = 1; i < fns.length; i++) {
      res = fns[i](res);
    }
    return res;
  };
};

export function propGetter(path) {
  const props = path.split('.');
  return function(target) {
    let res = target;
    for (var i = 0; i < props.length; i++) {
      if(!target) 
        target = target[props[i]];
      else
        return;
    }
    return target;
  }
}
