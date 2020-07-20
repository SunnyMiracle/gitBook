function F(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1 || n === 2) {
        return 1;
    }
    return F(n - 1) + F(n - 2);
}

const result = [];
for (let i = 0; i < 7; i++) {
    result.push(F(i));
}
console.log(result);
