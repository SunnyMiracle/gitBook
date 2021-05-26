### 

React 诞生于2013年，借鉴了很多函数式编程社区的很多经验以及约定，将DOM作为纯函数处理，不仅免去了繁琐的
手动DOM操作，还开启了多平台渲染的新思路。社区中强调不可变性，以及单项数据流。从而使得原本很复杂的项目简单化，
同时页加强了程序的可预测性。

React 是现代前端的基石，可以保证程序员以数据驱动的思维方式去考虑问题。从MVC的角度考虑，React仅仅是View这一层。
下边总结，我在工作中使用React 所总结的关键知识。

- JSX

  jsx是js的语法扩展，可以很好的展示UI 并且有js的所有语法加持，实现组件式的逻辑与UI封装，便于复用。

  安全方面，jsx会将所有渲染的内容在渲染之前转义成字符串，从而避免xss(cross-site-scripting)攻击。

- 元素

  区别于DOM元素，React元素是成本很低的，每一个React元素实际上就是一个对象。一个或者多个元素构成了组件。

  可以分成原生DOM元素，以及自定义元素，React元素中的 原生DOM元素就是以小写字符开头的xml 而自定义自规定是以大写字母开头。

- 组件 & props

  组件允许我们将UI以及内部的逻辑拆分成一个独立的代码片段，保证可以复用。有函数式组件以及class组件。

  props是不可以修改的？事实上props的数据是不可以修改的，而且深层数据也是不可修改。但是可以通过其他方式操作props，看代码：

    ```jsx
    const HC = Component => (customInfo) => {
      const componentKeys = Object.getOwnPropertyNames(Component);
      const Target = Object.create(null);
      componentKeys.forEach((key) => {
        if (key === 'props') {
          Target.props = {};
          const propsKeys = Object.getOwnPropertyNames(Component.props);
          propsKeys.forEach((itemProps) => {
            Target.props[itemProps] = Component.props[itemProps];
          });
        } else {
          Target[key] = Component[key];
        }
      });
      // 有同名覆盖的情况，以外部手动传入的为主。
      const customKeys = Object.keys(customInfo);
      customKeys.forEach((key) => {
        if (typeof customInfo[key] !== 'function') {
          throw new Error('formItemCommonProps 只允许传入公共事件回调。');
        }
        if (Target.props[key]) {
          const origin = Component.props[key];
          Target.props[key] = (...args) => {
            origin.apply(Target, args);
            customInfo[key].apply(Target, args);
          };
        } else {
          Target.props[key] = customInfo[key];
        }
      });
      Target.props = {
        ...customInfo,
        ...Component.props,
      };
      return Target;
    };
    ```

  上边代码就是劫持一个组件，并且操作了他的props。

- State & 声明周期

  state的更新可能是异步的，以为处于性能考虑，React会将多个setState合并成一次，所以可能props以及state都是异步更新的，因此我们不能基于state做一些状态更新，使用setState回调函数形式，获取上一次的state以及本地更新应用的props，也就是preState，currentProps.

  state的更新可能是异步的，为什么说是可能的，因此在React声明周期函数内的确是异步的，但是如果我们通过ref获取React组件之后，手动执行setState这时就是同步的。

***貌似React 16版本 setState都变成了异步的，以前15版本通过ref 获取示例然后 setState是同步的。***

- 事件处理

  React合成事件。在类组件中我们定义的方法，需要特别注意的是执行的this的指向。

    ```jsx
    class Toggle extends React.Component {
    	state = { isToggleOn: false }
      handleClick() {
        console.log(this.state)
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        );
      }
    }
    ```

  上述代码中点击之后并不会打印出state的值，这其实就涉及到了JavaScript函数中this指向的问题。可以看篇文章

  [this关键字](https://luqian.gitbook.io/mark/javascript/this-guan-jian-zi)

  再结合浏览器的时间循环与消息队列，可以得知点击事件触发之后会将回调函数放到消息队列中区，然后等待执行。

    ```jsx
    class Toggle extends React.Component {
    	state = { isToggleOn: false }
      handleClick() {
        console.log(this.state)
      }

      render() {
        return (
          <button onClick={() => { this.handleClick(); }}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        );
      }
    }
    ```

  代码改成这样可以保证输出期望的结果，但是如果作为prop传递给子组件的时候，会导致子组件更新，重新渲染，原因在于每一次匿名函数都是一个新的函数。因此建议手动绑定函数this，或者使用Public class fields (试验性，babel转义)

  [@babel/plugin-proposal-class-properties · Babel](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)

- key

  列表的key要唯一，如果在列表元素不变的列表中使用index也是可以的。

    ```jsx
    class List extends React.Component<any, any> {
      render() {
        return (
          <div>
            {this.props.children}
            <input type="text"/>
          </div>
        )
      }
    }

    class A extends React.Component<null> {
      titleInstance: null | Title;
      state = {
        list: [1, 2, 3, 4]
      }
         public render() {
            return (
                <div>
                    <ul>
                      {
                        this.state.list.map((item, index) => <List key={index}>{item}</List>)
                      }
                    </ul>
                  <button onClick={() => { this.setState({ list: this.state.list.reverse() }) }}>reverse</button>
                </div>
            );
        }
    }
    ```

  上边 结果排序之后 Input并没有跟随数字进行排序，因为key没有变化，React只更新prop值变化的部分，对于Input输入框则不作更新。

- 受控组件

  react受控组件，允许我们获取唯一的数据来源，可以做很多自定义的操作，尤其是在表单操作中。但是也带来一个问题，就是受控组件我们会多写很多代码，value Trigger的绑定

  在受控组件中value的props如果被指定后，用户输入在没有设置对应Trigger的前提下是不可以更改组件的value的，但是如果value的初始值设置成undefined或者null则用户输入是可以改变value的。

    ```jsx
    ReactDOM.render(<input value="hi" />, mountNode);

    setTimeout(function() {
      ReactDOM.render(<input value={null} />, mountNode);
    }, 1000);
    ```
  
- 组合 & 继承

  react组件的组合很常见，基本上都是通过props进行组合使用的，或者直接嵌套React元素组件。相反继承并不常见，貌似官方也不提倡使用类继承的方式复用逻辑或者UI。

  官方文档上说如果想通过继承复用某些逻辑，可以查分独立JavaScript模块的形式进行复用。

  但是个人觉得在Tsx开发环境下，也可以尝试使用继承来服用某些逻辑，其实有的时候继承可以更加直观，的确可以服用很多逻辑，少写代码。但是不熟悉类写法的同学慎用吧。
