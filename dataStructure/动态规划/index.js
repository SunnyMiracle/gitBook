const coins = [1, 2, 5, 10, 25];

const cache = [];
const list = {};
function minCount(amount) {
  cache[0] = 0;
  for (let i = 1; i <= amount; i++) {
    cache[i] = Infinity;
    list[i] = null;
    for (let j = 0; j < coins.length; j++) {
      const itemAmount = coins[j];
      if (i - itemAmount === 0) {
        cache[i] = 1;
        list[i] = [itemAmount];
      }
      if (i - itemAmount > 0 && cache[i - itemAmount] !== Infinity) {
        cache[i] = Math.min(cache[i - itemAmount] + 1, cache[i]);
        if (list[i] === null || list[i].length > list[i - itemAmount].length + 1) {
          list[i] = list[i - itemAmount].concat([itemAmount]);
        }
      }
    }
  }
}

minCount(41);
console.log(cache[41], list);
