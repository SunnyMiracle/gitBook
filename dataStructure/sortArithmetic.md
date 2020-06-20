## 排序算法
为了便于测试，我们创建一个构造函数，用以测试。
```javascript
function ArrayList() {
  let list = [];
  this.insert = function(item) {
    list.push(item);
  };
  this.toString = function() {
    return list.join();
  };
  // 交换函数
  this.swap = function(index1, index2) {
    const temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
  };
}
```
我们从效率最低的排序方法说起：（默认排序的顺序都是从小到大）

### 冒泡排序
冒泡排序算法是所有排序算法中最简单的一个，但是从时间负责度角度来说是最复杂的一个，也就是最差的。

比较相邻两项，然后交换顺序，每一次循环都会将较大的值交换到最后。
```javascript
this.popSort = function() {
  const length = list.length;
    for (let i = 0; i < length; i++) {
      // 没经过一次循环，最后一项值就已经是排好序的了，因此j的值 为 length - 1 - i
      for (let j = 0; j < length - 1 - i; j++) {
        if (list[j] > list[j + 1]) {
          this.swap(j, j + 1);
        }
      }
    }
}
```

### 选择排序
选择排序是一中原地址比较排序算法，选择排序的思路是找到数据中最小值，然后将其放到第一位，接着找到第二小的值，以此类推。

选择排序同样需要两次循环遍历，时间复杂度与冒泡排序是一致的。但是选择排序不用每次比较都进行数据交换，所以性能方面要
优于冒泡排序，最多需要n次数据交换即可。代码如下：
```javascript
this.selectionSort = function() {
  const length = list.length;
  let minIndex;
  for (let i = 0; i < length - 1; i++) {
    minIndex = i; // 默认认为最小值的下标就是i
    for (let j = i; j < length; j++) {
      if (list[j] < list[minIndex]) {
          minIndex = j;
      }
    }
    if (i !== minIndex) {
      this.swap(i, minIndex);
    }
  }
}
```
