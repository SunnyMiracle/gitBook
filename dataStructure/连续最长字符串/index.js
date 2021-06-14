// ababccdefg
const str = 'ababccdefg';
const maxStr = function (str) {
  let arr1 = []
  let result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      const next = str[j];
      if (arr1.indexOf(next) < 0) {
        arr1.push(next);
      } else {
        if (arr1.length > result.length) {
          result = arr1;
        }
        arr1 = [];
        break;
      }
    }
  }
  console.log(result.join(''));
}
console.time('maxStr');
maxStr(str);
console.timeEnd('maxStr');

const maxString = (str) => {
  let i = 0, j = 0;
  const set = new Set();
  let max = 0;
  let maxStr = '';
  const len = str.length;
  while (j < len) {
    const item = str[j];
    if (set.has(item)) {
      // 包含
      set.delete(str[i++]);
    } else {
      // 不包含
      set.add(item);
      j += 1;
      if (set.size > max) {
        max = set.size;
        maxStr = [...set.values()].join('');
      }
    }
  }
  return {
    max, maxStr
  };
}

console.time('maxString');
console.log(maxString(str));
console.timeEnd('maxString');
