import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/pages/list.less';
import MyLayout from '../components/layout/MyLayout';
import GoodsCard from '../components/GoodCard';
import LoadTip from '../components/common/LoadTip';
import { getGoodsList } from '../store/actions';
import { throttle } from '../constants/utils/util';

let actions = { getGoodsList };

class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.throttleListScroll = throttle(this.onScroll, 25);
  }

  componentDidMount() {
    const { goodsList } = this.props;
    !goodsList.length && this.getListData({ page: 1 });
    document.addEventListener('scroll', this.throttleListScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.throttleListScroll);
  }

  onScroll = e => {
    let scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop; // 页面上卷的高度
    let wholeHeight = document.body.scrollHeight; // 页面底部到顶部的距离
    let divHeight = document.body.clientHeight; // 页面可视区域的高度
    let { isAll } = this.props;
    if (wholeHeight - scrollTop - divHeight <= 50 && !isAll) {
      this.getListData();
    }
  };

  getListData = params => {
    const {
      actions: { getGoodsList }
    } = this.props;
    getGoodsList(params);
  };

  render() {
    const { goodsList, isGetting, isAll } = this.props;
    return (
      <div className="goodsListPage">
        {goodsList && goodsList.length
          ? goodsList.map((item, index) => {
              return <GoodsCard key={index} detailData={item} index={index} />;
            })
          : ''}
        <LoadTip
          getting={isGetting}
          all={isAll}
          handleClick={this.getListData}
        />
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    goodsList: state.goods.goodsList,
    isGetting: state.goods.isGetting,
    isAll: state.goods.isAll
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const navBarOptions = {
  title: '寻找宝贝',
  border: true
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLayout(GoodsList, navBarOptions));
