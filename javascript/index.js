function foo() {
    const fn = new Function('name', 'a = 10; console.log(name);');
    fn('123')
    console.log(a);
}
foo();
