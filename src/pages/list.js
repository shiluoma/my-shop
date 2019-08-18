import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/pages/list.less';
import MyLayout from '../components/layout/MyLayout';
import GoodsCard from '../components/GoodCard';
import { getGoodsList } from '../store/actions';

let actions = { getGoodsList };

class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      actions: { getGoodsList }
    } = this.props;
    getGoodsList();
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

const mapStateToProps = function(state, ownProps) {
  return {
    goodsList: state.goods.goodsList
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
