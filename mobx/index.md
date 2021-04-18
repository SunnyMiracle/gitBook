- 目前初步结论：

- 在将数据observerAbel的过程中是不会涉及到依赖收集的，意思就是Mobx也不知道
数据变化之后该执行那些reaction
  
- reaction的概念就是数据变化之后需要作出的相应。可以是打印一行数据，也可以是
更新视图等等。
  
- 依赖收集的过程是在声明、构造这些reaction的时候去做的，例如autorun函数执行调用
的时候。
  
- autorun内部的函数 在函数执行中会执行一遍，然后函数体内的取值操作会触发
通过Proxy代理之后的[[Get]]操作（packages/mobx/src/types/dynamicobject.ts）
  
- 注册reaction的时候会获取内部的属性，从而会返回得知当前属性的observable对象。
- 注册reaction的时候回实例化Reaction，之后再做绑定。

- observable中的属性[[Set]]时会触发Proxy注册的setter函数，在setter函数
中会获取到observable对应属性中的对应的Observable对象中绑定的Reaction（Set结构）
并以此执行。

// TODO 需要补充详细的内容。
