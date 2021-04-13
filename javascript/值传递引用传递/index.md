JavaScript是一门动态类型的语言，所谓动态，是因为在JavaScript代码运行过程中存在着很多隐式的强制类型转化。而对于那些静态类型语言来说，一个变量在声明的时候就已经确定了它的类型，后续赋值只能是限定的类型。
结论：JavaScript中变量是没有类型的，但是值却是有类型的，也可以说JavaScript中的数据有“类型”。
JavaScript中基本的数据类型：
null
undefined
boolean
number
string
object
symbol
数组、函数其实是特殊的对象，函数是一种可执行的对象。
const num = 123;
const str = '456';
const bool = true;
const obj = { name: 'zz' };
const sym = Symbol('des');

console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof bool); // boolean
console.log(typeof obj); // object
console.log(typeof sym); // symbol

// 推荐使用下边的方式判断数据类型
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(num)); // [object Number]
console.log(Object.prototype.toString.call(str)); // [object String]
console.log(Object.prototype.toString.call(bool)); // [object Boolean]
console.log(Object.prototype.toString.call(obj)); // [object Object]
console.log(Object.prototype.toString.call(sym)); // [object Symbol]
回归正题
值复制（value-copy）引用复制（reference-copy）这两个概念存在于变量赋值以及参数传递过程中，在JavaScript中变量赋值以及参数传递在语法上是不能区分是哪一种的，完全是通过对值的类型来判断的。
let a = 100;
let b = a;
b++;
console.log(a, b); // 100 101

let obj = { name: 123 };
let obj1 = obj;
obj1.name = 'obj1 name';
console.log(obj); // { name: 'obj1 name' }
按照数据类型，划分成两类，一类是简单值（string, number, boolean, symbol, undefined， null）；第二类就是复杂值（object, 包含数组 函数）
简单值总是通过值复制进行变量赋值，参数传递等；而复杂值则总是通过引用复制进行变量赋值，参数传递。
正是由于这种机制的存在，很多情况下一不留神就会写出不符合我们预期的代码。但是一旦我们领悟到，就会明白原来使我们的“打开方式”不对。
正确的打开方式：
解构赋值避免引用复制
const obj = {name: 'obj'};
let { name } = obj;
name = 'other name'; // 实施上解构赋值，是声明了一个新的变量name,并赋初值为‘obj’
数组的slice()
const arr = [1, 2, 3];
const other = arr.slice(); // slice()返回一个数组的浅拷贝的引用
other.push(4);
console.log(arr, other); // [1, 2, 3] [1, 2, 3, 4]
妙用：
JavaScript引用复制其实是很用有的一个设计，但有时也会成为障碍。下边介绍一个妙用：
假设有一个函数弹窗组件，函数的返回值是一个销毁弹窗的函数引用。
interface I
