



// 关于ES6类继承的原理探究，不可删除

class Test {
    render(value) {
        console.log(value, 'Test');
    }
}
Test.staticName = 'static name';
class A extends Test{
    static aa = 0;
    static fn() {
        console.log(super.staticName)
    };
    render(value) {
        super.render(value);
        console.log('A');
    }
}
// A.staticName = 'A static name'
// console.log(Test.staticName, A.staticName)
// console.log(Test.hasOwnProperty('staticName'))
// console.log(A.hasOwnProperty('staticName'), A.prototype.hasOwnProperty('staticName'));
console.log(Object.getOwnPropertyNames(A.prototype))
console.log(Object.getOwnPropertyNames(Test.prototype))
console.log(Object.getOwnPropertyNames(Test))
console.log(Object.getOwnPropertyNames(A))
// console.log(A.prototype === Test)
// console.log(Object.getPrototypeOf(A.prototype), Object.getPrototypeOf(Test.prototype))
// console.log(Object.getPrototypeOf(A), Object.getPrototypeOf(Test))
// console.log(A.prototype, Test.prototype);
// console.log(A, Test);
// console.log(Test.isPrototypeOf(A), Object.getPrototypeOf(A));

const instance = new A();
// instance.render('render')
// console.log(instance.staticName, Test.staticName, A.staticName, Test.prototype.staticName);
// console.log(Test)
// console.log(A)

// A.fn()


console.log(Object.getPrototypeOf(A.prototype) === Test.prototype);
console.log(A.__proto__ === Test)
console.log(typeof A, typeof Test)
console.log(Object.getPrototypeOf(A) === Test)
console.log(Object.getPrototypeOf(A.prototype) === Test.prototype);
console.log(Object.getPrototypeOf(Test.prototype) === Object.prototype)
console.log(Object.getPrototypeOf(Test) === Function.prototype)
console.log(A, Test)
