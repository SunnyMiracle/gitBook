### 代码分割

代码分割是现在主流打包器（webpack）等支持的一种技术，可以提高我们应用的性能，保证用户不加载永远用不到的资源，可以在减少在初次访问应用要加载的bundle资源的体积。

- 一些思考

  现在目前工作中主流的应用都是通过webpack进行打包构建的，项目拆包过程，现在我能想到比较好的两种方案是：

    1. 基于单页应用路由拆分组件，公共模块可以单独split 成一个单独的chunk。对于node_modules里边的资源，区分同步以及异步加载两部分，分别输出成单独的chunk。为了保证每个chunk压缩后再20kb以内，还可以进一步对chunk进行拆分。
    2. 大体依赖webpack optimization splitchunk的默认选项。为每个路由页面都拆分单独的异步资源。这样会导致一个问题就是会有更多的资源重复。

  具体的应用情况具体分析吧。需要根据项目的实际情况以及公共资源的多少而定。

- 写法
    1. import()
    2. React.lazy(() ⇒ import('')) + React.Suspense(组件)

    ```jsx
    import React, { Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

    const Home = lazy(() => import('./routes/Home'));
    const About = lazy(() => import('./routes/About'));

    const App = () => (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </Switch>
        </Suspense>
      </Router>
    );
    ```

  React.lazy() 仅支持 默认导出的模块（export default xxx）

  如果引用的模块是命名导出，可以创建中间模块，然后中间模块在默认导出，这样可以保证tree-shaking 不会出错，而且不必引入不需要的组件。  在很多组件库中都是这样导出模块组件（antd系列）

    ```jsx
    // componentA
    export const ComponentA = () => <div>A</div>;

    // 中间模块
    export {ComponetA as default} from './compoenntA';

    // 使用代码
    React.lazy(() => import('./中间模块'));
    ```
