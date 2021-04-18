## 值复制以及引用复制

值复制（value-copy）引用复制（reference-copy）这两个概念存在于变量赋值以及参数传递过程中，
在JavaScript中变量赋值以及参数传递在语法上是不能区分是哪一种的，完全是通过对值的类型来判断的。

``` javascript
let a = 100;
let b = a;
b++;
console.log(a, b); // 100 101

let obj = { name: 123 };
let obj1 = obj;
obj1.name = 'obj1 name';
console.log(obj); // { name: 'obj1 name' }
```
按照数据类型，划分成两类，一类是简单值，也可以称为直接值（string, number, boolean, symbol, undefined， null）；
第二类就是复杂值（object, 包含数组 函数）。

简单值总是通过值复制进行变量赋值，参数传递等；而复杂值则总是通过引用复制进行变量赋值，参数传递。

正是由于这种机制的存在，很多情况下一不留神就会写出不符合我们预期的代码。
但是一旦我们领悟到这一点，就会明白原来是我们的“打开方式”不对。

正确的打开方式：

- 解构赋值避免引用复制
``` javascript
const obj = {name: 'obj'};
let { name } = obj;
name = 'other name'; // 实施上解构赋值，是声明了一个新的变量name,并赋初值为‘obj’
数组的slice()
const arr = [1, 2, 3];
const other = arr.slice(); // slice()返回一个数组的浅拷贝的引用
other.push(4);
console.log(arr, other); // [1, 2, 3] [1, 2, 3, 4]
```

JavaScript引用复制其实是很用有的一个设计，目的在于降低堆内存的消耗。

有时我们也可以利用引用复制做一些有意思的事情。

假设有一个函数弹窗组件，函数的返回值是一个销毁弹窗的函数引用。

``` typescript
export interface IConfig {
  content: Node;
}
const fnModal = (config: IConfig): () => void => {
  
  // 构造弹窗，
  
  // 返回删除事件
  return function remove() {
    // delete Modal
  }
}
```
现在假设content的内容中有一个按钮，点击按钮需要关闭弹窗。这个时候要怎么做呢？
fnModal函数的调用结果是删除弹窗的函数引用，content中的内容绑定点击事件又需要通过函数调用来实现。所以理论上我们是拿不到销毁弹窗的函数引用的。
但是借助引用赋值就可以实现。

``` js
const obj = {
  removeHandler: null,
};
obj.removeHandler = fnModal({
  content: (<div> <button onclick={obj.removehandler}>delete</button </div>)
});
```
我们借助一个对象做中转，
这样处理就可以保证在函数返回的时刻拿到关闭函数的引用，点击事件理论上的执行时间总是要晚于函数结果返回的时间。保证逻辑正确。


