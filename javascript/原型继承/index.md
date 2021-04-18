## JavaScript原型以及原型继承

JavaScript中的类跟其他语言比如说Java中的类是不同的概念，JavaScript中构造函数以及最终的实例都是对象，
而在Java中实例对象是通过类的实例化产生的，类只是用于描述。其次关于继承，很多人说JavaScript是基于原型链继承的，继承机制
的实现也跟Java不同，Java中的类继承是完全复制属性方法等，但是在JavaScript中继承是指基于引用的。

明确几个概念，有助于理解JavaScript的原型的概念以及原型链。

- 构造函数

  JavaScript中没有类，有的只是 "构造函数" ，例如 Object、Function、Number、String、Boolean、Symbol、RegExp……

- prototype
  
  构造函数具有这个属性，一般指向的是一个对象，也可能是null 或者其他的，
  可以赋值操作。同样普通的function函数具有这个属性，但是箭头函数不具有这个
  属性，因此我们说function函数都可以"构造调用"，但是箭头函数不可以。
  
- 实例化
  
  实例化就是构造调用函数的过程，返回一个对象。也就是我们执行 new 关键字的过程。
    
      实例化的过程：
      1. 创建一个空对象
      2. 将创建的对象的原型指向构造函数的prototype属性。
      3. 执行构造函数，并绑定构造函数中的this为刚刚创建的对象。
      4. 判断构造函数的返回结果，如果有返回值且为对象，再返回构造
      函数的执行结果，否则返回第一步创建的对象。
  

- 原型
  
  通过实例化产生的对象，或者变量声明的直接量（数据类型为 number/string/boolean）
  的都是具有原型的，原型是一个隐藏属性。
  
  但是null undefined 是没有原型的。

  原型指向的内容就是其数据类型对应的构造函数的prototype（是一个对象）。

  例如：
  ```javascript
  const a = 'aaa';
  const b = new String('bbb');
  // 上边两个变量的原型都指向 String.prototyp
  ```
  "原型" 是一个对象的隐藏属性，是不可枚举的。有些浏览器会为对象、变量实现一个 ```__proto__```
  的属性，但是并不是标准实现。变量声明的 直接量值，也是有原型的，也可以通过 ```__proto__```属性获取其原型。
  
  可以通过Object.getPrototypeOf来获取任意变量或者对象的原型。
  ```javascript
  const a = 'aaa';
  const b = new String('bbb');
  Object.getPrototypeOf(a) === Object.getPrototypeOf(b);
  ```

- 原型链

  上边提到的原型，其实指向了一个对象，就是其构造函数的prototype属性。既然是对象，
  那么这个对象也有其原型。
  
  对象取值的过程，大概描述可以是这样：首先在自有属性中查找有没有要查找的属性，如果没有则看是不是getter属性。
  然后会在其原型上查找，如果原型指向的对象中还是没找到，则会继续查找原型的原型对象，知道为null为止。
  

### 内置构造函数的必要说明点
- 所有的构造函数都是函数，因此函数的原型指向都是Function.prototype
```javascript
console.log(Object.getPrototypeOf(Object) === Function.prototype); // true
console.log(Object.getPrototypeOf(String) === Function.prototype); // true
console.log(Object.getPrototypeOf(Number) === Function.prototype); // true
console.log(Object.getPrototypeOf(Boolean) === Function.prototype); // true

console.log(Object.getPrototypeOf(String.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Number.prototype) === Object.prototype); // true

console.log(Object.getPrototypeOf(Object.prototype)); // null
```
- 所有构造函数的prototype属性都是对象，因此构造函数的prototype的原型都指向Object.prototype
- 但是Object.prototype的原型为null
- 所有内置对象的原型链最终都是Object.prototype。除非对象是通过Object.create() 创建的。

### 原型继承
ES6中引入了Class关键字来声明类，更加像Java这种 "面向对象" 的编程模式了，但是实质上跟ES5中的实现是没有区别的。

看下边代码如果实现 "构造函数" 的继承
```javascript
function Foo(name) {
    this.name = name;
}
function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}
Foo.prototype.sayName = function() {
    console.log(this.name);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.sayLabel = function() {
    console.log(this.label);
}

const instance = new Bar('a', 'label a');
instance.sayName(); // a
instance.sayLabel(); // label a
```
关键代码为 Foo.call(this.name) 以及 Bar.prototype = Object.create(Foo.prototype) 这两行代码分别保证了
实例属性以及原型属性的继承。一个问题，我们是否可以将Bar.prototype = Object.create(Foo.prototype); 改成
Bar.prototype = Foo.prototype 或者 Bar.prototype = new Foo() 呢？

其实大体上来说也是可以实现效果的，但是会有些副作用，首先直接复制的话，修改Bar的prototype 会影响到Foo.prototype 这是
我们不希望的。如果直接实例化的话，会把实例属性赋值到Bar.prototype 上去，从而影响其他的Bar构造函数的实例。

除了Object.create 我们还可以使用ES6新增的Object.setPrototypeOf(Bar.prototype, Foo.prototype) 方法来实现，
相比于Object.create 会有性能上的提升，因为Object.create 会重新创建一个新的对象，从新赋值，导致垃圾回收。

### 对象关联
通过上边，我们可以清楚的知道JavaScript中对象实例化以及构造函数的关系， 跟传统的面向对象语言是有本质的差别的，
JavaScript中这一切都是对象属性的引用，同时通过 "原型" 机制实现。

我们能不能仅使用JavaScript的 "原型" 机制，而不使用用 "构造函数" 这种形式呢？

*不用使用 new 关键字，就不用考虑每一层都存在的prototype这个属性。*

我们可以通过Object.create() 来实现。

```javascript
const foo = {
    say: function() {
        console.log('say something');
    }
}
const bar = Object.create(foo);
bar.say(); // say something
console.log(foo.isPrototypeOf(bar)); // true
```
上述代码中，对象bar的原型指向了foo。上边代码实现了基于原型关联对象，但是有一个问题就是对于对象bar来说
他的一些API也就是say 是隐藏式的，这会带来维护上的问题，因为为了可维护性，我们可以写出下边的代码：
```javascript
const foo = {
    say: function() {
        console.log('say something');
    }
}
const bar = Object.create(foo);
bar.inSay = function() {
    return this.say();
}
```
这样会让bar的API接口更加清晰。

### 与原型、原型链相关的方法或者操作符

- instanceof 

返回boolean 说明，一个对象的原型链上是否有指向某个构造函数的 prototype 对象上的方法或者属性。
```javascript
const a = function () {};
console.log(a instanceof Object); // true
console.log(a instanceof Function); // true
```
上边代码都是true的原因在于，函数a的原型指向Function.prototype，然后Function.prototype
的原型又指向了Object.prototype。所以函数a的原型链上有指向Object.prototype所以，都是true。
- Object.getPrototypeOf
获取任意对象、值变量的原型。
```javascript
const a = 'aaa';
const b = new String('bbb');
Object.getPrototypeOf(a) === Object.getPrototypeOf(b);
```
- Object.prototype.isPrototypeOf
用于判断一个对象的原型链中是否有 操作对象。
首先第一个限定条件为 要判断的值是否是一个对象，也就是是否为object类型的数据，
如果不是object数据类型，而是一些值变量（变量声明的字符串、数字等）则返回false。

```javascript
const a = 'aaa';
const b = new String('bbb');
const c = String('ccc');
String.prototype.isPrototypeOf(a); // false
String.prototype.isPrototypeOf(b); // true
String.prototype.isPrototypeOf(c); // false
```
上边代码中，值变量 a 不是对象数据结构，虽然a的原型是String.prototype，但是由于数据类型不是对象，返回的结果是false。
强制类型转化操作String() 返回值也是一个值变量，因此返回结果也是false。
