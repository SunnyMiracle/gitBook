const arr = [72, 6, 57, 88, 60, 42, 83, 73, 48, 85];

/**
 * @param {Array} arr
 * @param {Number} left 要快排的起始坐标
 * @param {Number} right 要快拍的结束坐标
 * @return {Error}
 */
function quickSort(arr, left, right) {
  // i代表数组下标的起始，j代表数组下标的结束位置。小于为参数异常问题，等于则证明数组是空的
  const len = arr.length;
  if (len === 1) {
  
  }
  let i = left, j = right;
  if (i > j) {
    return Error('数据异常');
  }
  if (i < j) {
    const x = arr[i];
    while (i < j) {
      while (j > i && arr[j] >= x) {
        j--;
      }
      // 循环结束，证明找到了第一个 小于 X的数据，并且获得下标 j
      if (i < j) {
        arr[i] = arr[j];
        i++; // i的位置已经是比x小的数据了，因此i递增
      }
      while (i < j && arr[i] <= x) {
        i++;
      }
      // 退出循环，则证明找到了第一个大于 X的数据，并且获取得到下标 i
      if (i < j) {
        arr[j] = arr[i];
        j--; // 上边数据交换之后，则证明，j的位置已经是比 x大的数据了，j递减
      }
    }
    // 退出循环，i 与 j相等。
    arr[i] = x;
    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right);
  }
}

quickSort(arr, 0, 9);

console.log(arr);
