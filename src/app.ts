import { Component } from "react";
import './styles/icon.scss'
import 'default-passive-events';//编译h5 会有警告 解决 
import './app.scss';
class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
