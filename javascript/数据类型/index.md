## JavaScript中的数据类型

JavaScript是一门动态类型的语言，所谓动态，是因为在JavaScript代码运行过程中存在着很多隐式的强制类型转化。
而对于那些静态类型语言来说，一个变量在声明的时候就已经确定了它的类型，后续赋值只能是限定的类型。

**结论：JavaScript中变量是没有类型的，但是值却是有类型的，也可以说JavaScript中的数据有“类型”。**

JavaScript中基本的数据类型：
- null
- undefined
- boolean
- number
- string
- object
- symbol
  
数组、函数其实是特殊的对象，函数是一种可执行的对象。下边代码予以说明：
```javascript
const fn = function (target, name) {};
const arr = [1, 2];

Object.getOwnPropertyNames(fn); // ["length", "name", "arguments", "caller", "prototype"]
Object.getOwnPropertyNames(arr); // ["0", "1", "length"]
```
可以看到函数是具有特殊属性 caller的对象；数组的属性为数值以及包含length属性。

```javascript
const num = 123;
const str = '456';
const bool = true;
const obj = { name: 'zz' };
const sym = Symbol('des');
const fn = function () {};
const fn1 = () => {};
const arr = [];

console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof bool); // boolean
console.log(typeof obj); // object
console.log(typeof sym); // symbol
console.log(typeof fn); // function
console.log(typeof fn1); // function
console.log(typeof arr); // object

// 推荐使用下边的方式判断数据类型
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(num)); // [object Number]
console.log(Object.prototype.toString.call(str)); // [object String]
console.log(Object.prototype.toString.call(bool)); // [object Boolean]
console.log(Object.prototype.toString.call(obj)); // [object Object]
console.log(Object.prototype.toString.call(sym)); // [object Symbol]
console.log(Object.prototype.toString.call(fn)); // [object Function]
console.log(Object.prototype.toString.call(fn1)); // [object Function]
console.log(Object.prototype.toString.call(arr)); // [object Array]
```
在判断数据类型的时候有些JavaScript历史遗留问题，就是typeof null 返回的是object，
这个问题由来已久，估计是不会修复了。
同样判断数组的时候也不符合我们的预期。

因此判断一个数据类型是不是null的情况推荐使用下班的Object.prototype.toString来进行判断。

虽然说数组以及函数都是特殊类型的对象，但是Object.prototype.toString都返回了我们期望的结果。
