// console.log(Object.getPrototypeOf(Object) === Function.prototype);
// console.log(Object.getPrototypeOf(String) === Function.prototype);
// console.log(Object.getPrototypeOf(Number) === Function.prototype);
// console.log(Object.getPrototypeOf(Boolean) === Function.prototype);
//
// console.log(Object.getPrototypeOf(String.prototype) === Object.prototype);
// console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);
// console.log(Object.getPrototypeOf(Number.prototype) === Object.prototype);
//
// console.log(Object.getPrototypeOf(Object.prototype));

// const a = function () {
// }
// console.log(a instanceof Object);
// console.log(a instanceof Function);

const a = 'aa';
const b = new String('bbb');
console.log(Object.getPrototypeOf(a));
console.log(Object.getPrototypeOf(b));

String.prototype
