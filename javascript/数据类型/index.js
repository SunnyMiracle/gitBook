const num = 123;
const str = '456';
const bool = true;
const obj = { name: 'zz' };
const sym = Symbol('des');
const fn = function () {};
const fn1 = () => {};
const arr = [];

console.log(typeof undefined);
console.log(typeof null);
console.log(typeof num);
console.log(typeof str);
console.log(typeof bool);
console.log(typeof obj);
console.log(typeof sym);
console.log(typeof fn);
console.log(typeof fn1);
console.log(typeof arr);

console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(num));
console.log(Object.prototype.toString.call(str));
console.log(Object.prototype.toString.call(bool));
console.log(Object.prototype.toString.call(obj));
console.log(Object.prototype.toString.call(sym));
console.log(Object.prototype.toString.call(fn));
console.log(Object.prototype.toString.call(fn1));
console.log(Object.prototype.toString.call(arr));

