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

// function foo() {
//     var a = 10;
//     function bar() {
//         console.log(a);
//     }
//     return bar;
// }
// let target = foo();
// target(); // 最终打印结果为10

for (var i = 0; i <= 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, j * 1000)
    })(i);
}
