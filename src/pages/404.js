import React, { Component } from 'react';
import '../styles/pages/notfound.less';
import NavBar from '../components/Layout/NavBar';

const staticPath = process.env.STATIC_PATH;
console.log('测试');

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="errorWrap">
        <NavBar />
        <div className="errorContent">
          <div>
            <img src={staticPath + '/404.png'} alt="简历超人" />
            <p>啊哦，页面暂时无法访问~</p>
            <p>请检查网址是否正确</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
