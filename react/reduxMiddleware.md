## Middleware

redux中间件的核心原理就是函数柯力化（参数预制，闭包）。
两部分比较重要，一个是applyMiddleware另一个是compose
源代码如下：

```javascript
function applyMiddleware(...middlewares) {
    return createStore => (reducer, preloadedState) => {
        const store = createStore(reducer, preloadedState)
        let dispatch = () => {
          throw new Error(
            'Dispatching while constructing your middleware is not allowed. ' +
              'Other middleware would not be applied to this dispatch.'
          )
        }
    
        const middlewareAPI = {
          getState: store.getState,
          dispatch: (action, ...args) => dispatch(action, ...args)
        }
        const chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
    
        return {
          ...store,
          dispatch
        }
    }
}
function compose(...funcs) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return arg=> arg;
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

再来看一个普通的redux Middleware的写法：
```javascript
export default store => next => action => {
    console.log('dispatch', action);
    next(action);
    console.log('end', action);
}
```
中间件借鉴了Koa的中间件实现，redux中对中间件的dispatch做了封装，嵌套调用，compose之后

dispatch = fn1(fn2(fn3(store.dispatch)))  假设就只有三层中间件。dispatch 替换之后，用户view层触发
store.dispatch(action)的时候，就会执行这个嵌套函数，也就是fn1(fn2(fn3(store.dispatch)))；

对于fn1 来说next参数就是 fn2(fn3(store.dispatch)), 对于fn3来说next就是 store.dispatch。
提别说明，这里的store指的是dispatch未替换之前的store，因此最后一层会直接触发最终的reducer

函数嵌套执行，调用栈执行到最低端，之后再出栈执行。所以达成洋葱模型。
