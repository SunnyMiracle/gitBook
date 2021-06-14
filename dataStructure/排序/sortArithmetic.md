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

### 插入排序
插入排序中假设第一个元素已经是排好序的，之后插入的数据跟前边已经排好序的值依次进行比较，如果插入的数据小于之前已经排好序的数据，则
进行一次交换操作。
```javascript
this.insertSort = function() {
    const length = list.length;
    for (let i = 1; i < length; i++) {
        let j = i;
        while (j > 0 && list[j - 1] > list[j]) {
            this.swap(j - 1, j);
            j--;
        }
    }
}
```

### 归并排序
归并排序是可以在实际应用中使用的排序算法，相较于上边的排序算法，性能优异，时间复杂度为O(nlogn)。
对于数组原生方法的实现上，FF浏览器就是采用这种算法实现的，Chrome的实现是采用快速排序。

归并排序是一种分治算法，将大的问题分解成小的问题，递归的进行处理。
```javascript
this.mergeSort = function() {
    const merge = function (left, right) {
        const result = [];
        let il = 0, ir = 0;
        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++]);
            } else {
                result.push(right[ir++]);
                if (left[il] === right[ir]) {
                    il++;
                }
            }
        }
        while (il < left.length) {
            result.push(left[il++]);
        }
        while (ir < right.length) {
            result.push(right[ir++]);
        }
        return result;
    };
    const split = function (arr) {
        if (arr.length === 1) {
            return arr;
        }
        const mid = Math.floor(arr.length / 2);
        return merge(split(arr.slice(0, mid)), split(arr.slice(mid, arr.length)));
    };
    list = split(list);
}
```
这个算法分成了两个阶段：
- 拆分阶段，将一个数组拆分成长度为1的子数组为止。
- 合并阶段，递归执行合并，数组长度为一的数组合并为长度为2的，知道最终完成整个数组的排序。

需要注意的是合并阶段的逻辑，合并两个数组，分别从两个数组下标为0的地方进行遍历，逐个进行比较(可以从小到大，也可以从大到小)，
并将数据push到最终的结果中去。最后看看两个数组中哪个有剩余，将剩余的内容push进最终的结果中即可。

### 快速排序
快速排序也是利用到了分治思想来解决问题。首先需要找到一个表位点，从数组的两头开始遍历，比表位点大的数据放在表位点右边，否则放在左边。

并且跟随标志位的增减进行逐个遍历。
