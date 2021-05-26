const cache = {
    0: 0,
    1: 1,
    2: 1,
};

function F(n) {
    if (cache[n] !== undefined) {
        return cache[n];
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1 || n === 2) {
        return 1;
    }
    const result =  F(n - 1) + F(n - 2);
    cache[n] = result;
    return result;
}

const result = [];
for (let i = 0; i < 7; i++) {
    result.push(F(i));
}
console.log(result);
console.log(F(50));
