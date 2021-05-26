### Context

在react中数据传递是通过props自上而下单向传递的，但是对于一些公用的数据，比如说
个人信息、主题色等，如果一层一层的显示传递，未免显得冗余。context就提供了这样
一种方式，可以避免一层层显示传递，而保证组件都可以接收到。

- 优点

    可以脱离组件树逐层传递，而实现组件各层级共享数据。

- 缺点

    会造成组件的复用性变差。

#### API

- React.createContext
- Context.Provider
- Context.Consumer
- Context.displayName

类组件可以通过Class.contextType 属性赋值来实现对某个context值的订阅。

如果使用了 public class fields 语法 也可以声明 static 属性contextType来进行订阅。


context值变化之后会通知所有订阅组件进行重新渲染，
Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

因此需要注意的一点是，如果Provider组件的value值是一个Object数据，
不是通过引用关系赋值的话，Provider所在的组件（父组件）有任何更新都会导致
Consumer组件重新渲染。如果Provider的value设置为state，再不更新当前state值的情况
下是不会涉及到Consumer组件的重新渲染的。

***这部分也是react性能优化的一部分操作，同理props的传值也是提倡通过state赋值***

```jsx
// Bad
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}

// GOOD
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
      other: 'other info', // 更新other内容引发的重新渲染不会涉及到Consumer组件的重新渲染
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```
