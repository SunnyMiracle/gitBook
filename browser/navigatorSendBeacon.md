## navigatorSendBeacon

- 试想一个场景在页面关闭时需要发送一个统计数据，或者调用一个接口来改变一个特定的状态。
- 相关的API有 window.onunload这个事件指的是在页面已经卸载，新页面即将渲染的时候来触发。
- window.beforeunload这个事件指的是页面即将卸载时候触发。
- 正常逻辑情况下我们肯定是会用到这两个事件，在这两个事件的回调函数中来调用一个接口。
- 但是调用接口，这是一个异步操作，如果打开控制台的 Preserve log 功能可以看到当前的接口 被 cancel调了。原因很简单，
当前页面的进程被kill掉，对应的网络请求异步线程中的任务也会被kill掉，因此看到的结果就是相应的http请求也会abort。
- 其实可以设置 ajax 的async 属性为false，这相当于同步请求，可以达到效果。
- Navigator.sendBeacon 就可以适用与这种需求，详情请见：[https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon
](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)
- 但是需要注意的是，Navigator.sendBeacon 发出的请求只能是 Post 请求。
- 不论是关闭当前tab页还是关闭window 浏览器都会尽量发送当前的beacon
