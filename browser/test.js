// 20200707190530
// 2020年07月07日 19:05:30
function parse(str) {
    const year = str.substr(0, 4);
    const month = str.substr(4, 2);
    const day = str.substr(6, 2);
    const h = str.substr(8, 2);
    const m = str.substr(10, 2);
    const second = str.substr(12, 2);
    return `${year}年${month}月${day}日 ${h}:${m}:${second}`;
}
function parse2(str) {
    const keys = [3, 5, 7, 9, 11, 13];
    const list = str.split('');
    let temp = '';
    let keyIndex = 0;
    let result = '';
    list.forEach((item, index) => {
        temp += item;
        if (index === keys[keyIndex]) {
            let tempResult = '';
            switch (keyIndex) {
                case 0: {
                    tempResult = temp + '年';
                    break;
                }
                case 1: {
                    tempResult = temp + '月';
                    break;
                }
                case 2: {
                    tempResult = temp + '日';
                    break;
                }
                case 3: {
                    tempResult = ` ${temp}:`
                    break;
                }
                case 4: {
                    tempResult = temp + ':';
                    break;
                }
                default: {
                    tempResult = temp;
                    break;
                }
            }
            result += tempResult;
            keyIndex++;
            temp = '';
        }
    });
    return result
}
function parse3(str) {
    return str.replace(/(^\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, function ($1, $2, $3, $4, $5, $6, $7) {
        return `${$2}年${$3}月${$4}日 ${$5}:${$6}:${$7}`;
    });
}

console.log('begin');

console.time('substr');
for (let i = 0; i < 10000; i++) {
    const str = 20200707190530 + Math.random() * 10000;
    parse(`${str}`);
}
console.timeEnd('substr');

console.time('forEach')
for (let i = 0; i < 10000; i++) {
    const str = 20200707190530 + Math.random() * 10000;
    parse2(`${str}`);
}
console.timeEnd('forEach')

console.time('Reg');
for (let i = 0; i < 10000; i++) {
    const str = 20200707190530 + Math.random() * 10000;
    parse3(`${str}`);
}
console.timeEnd('Reg')
