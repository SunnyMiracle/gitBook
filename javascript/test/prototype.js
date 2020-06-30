const foo = {
    say: function() {
        console.log('say something');
    }
}
const bar = Object.create(foo);
bar.say(); // say something
console.log(foo.isPrototypeOf(bar))
