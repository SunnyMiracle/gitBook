ref获取真实DOM

官方推荐大家使用回调方式绑定获取真实DOM实例的引用，为什么呢？

出于性能方面的考虑？

- 回调形式会在DOM节点发生变化之后再次调用，对于大多数的组件来说 在卸载之后还会调用一次，此时回调函数中
的第一个参数就是null，这个时候我们可以做一些逻辑操作，比如说对于以下编辑器类的组件，执行destroy方法等。

- 相反如果是字符串形式的话，我们没有实际去做这些事情。

- 回调形式的问题？
在组件更新阶段，由于ref是匿名函数形式传递，导致更新前与更新好的函数引用不一致，因此React需要将原来ref
绑定函数设置为null 然后再执行新的ref绑定函数。
```jsx
class RefTest extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 1,
        };
    }
    componentWillMount() {
        console.log('componentWillMount');
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.setState({
            count: 2,
        });
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    refCallBack = (ref) => {
        console.log(ref);
    };
    render() {
        return (
            <div ref={this.refCallBack}>
                Ref Test
                <span>{this.state.count}</span>
            </div>
        )
    }
}
```
上边代码 在更新阶段，是不会重新打印出dom节点的。

- 还有一点就是字符串形式的ref没有办法获取到子组件的dom元素，但是通过回调形式，由于是函数引用，可以在子组件中编写相关代码
将子组件的内部DOM元素上进行ref绑定，从而父组件可以跨层级获取DOM

