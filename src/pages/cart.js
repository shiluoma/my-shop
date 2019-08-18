import React, { Component } from 'react';
import '../styles/pages/notfound.less';
import MyLayout from '../components/layout/MyLayout';

const staticPath = process.env.STATIC_PATH;

class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="errorWrap">
        <div className="errorContent">
          <div>
            <img src={staticPath + '/404.png'} alt="notFound" />
            <p>啊哦，页面暂时无法访问~</p>
            <p>请检查网址是否正确</p>
          </div>
        </div>
      </div>
    );
  }
}

const navBarOptions = {
  title: '我的商城',
  border: true
};

export default MyLayout(GoodsList, navBarOptions);
