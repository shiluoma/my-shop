import React, { Component } from 'react';
import '../styles/pages/list.less';
import MyLayout from '../components/layout/MyLayout';
import GoodsCard from '../components/GoodCard';

class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { goodsListdata } = this.props;
    return (
      <div className="goodsListPage">
        {goodsListdata && goodsListdata.length
          ? goodsListdata.map((item, index) => {
              return <GoodsCard key={index} detailData={item} />;
            })
          : ''}
      </div>
    );
  }
}

const navBarOptions = {
  title: '寻找宝贝',
  border: true
};

export default MyLayout(GoodsList, navBarOptions);
