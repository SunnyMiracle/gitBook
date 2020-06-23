// function foo() {
//     const fn = new Function('name', 'a = 10; console.log(name);');
//     fn('123')
//     console.log(a);
// }
// foo();

// for (var i = 0; i < 10; i++) {
//     //
// }
// console.log(i);

// console.log(b);
// var b = 10;

foo();
var foo;
function foo() {
    console.log(1);
}
foo = function () {
    console.log(2);
}
// function foo() {
//     console.log(3);
// }
