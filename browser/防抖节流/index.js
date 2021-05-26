// 防抖，避免重复错误性输入，只保留最后一次的调用，并在timeout之后执行。
const debounce = (fn, delay) => {
  let timer;
  return (...res) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...res);
    }, delay);
  }
}

function debounce_fn(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    const res = arguments;
    const context = this;
    timer = setTimeout(function () {
      fn.apply(context, res);
    }, delay)
  }
}

const testObj = {
  name: 'test name',
  sayName: debounce_fn(function () {
    console.log(this.name, 'debounce');
  }, 100),
  hello: () => { console.log(this.name, 'hello') }
}
testObj.sayName();
testObj.hello();

// 节流，降低函数调用的频率,主要用在动画、滚动等事件处理方面。
const throttle = (fn, timeout) => {
  let timer;
  let preTime = Date.now();
  return (...res) => {
    clearTimeout(timer);
    if (Date.now() - preTime >= timeout) {
      preTime = Date.now();
      fn(...res);
    } else {
      // 为了防止 节流间隔时间过长之后导致的丢失最后一次调用问题，因此需要再补上一次调用。
      timer = setTimeout(() => {
        fn(...res);
      }, timeout);
    }
  }
}
