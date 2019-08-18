import React, { PureComponent } from 'react';
import '../styles/components/goodCard.less';

const staticPath = process.env.STATIC_PATH;

export default class GoodCard extends PureComponent {
  render() {
    const { detailData, index } = this.props;
    return (
      <div className="goods_item">
        <div className="goods_item01">
          <img src={staticPath + detailData.goods_url} alt=""></img>
        </div>
        <div className="goods_item01_pro">
          <p className="item-description">{detailData.goods_description}</p>
          <div className="now-price">
            <p>￥</p>
            {detailData.goods_price}
            <p>￥{Math.floor(detailData.goods_price * 1.2)}</p>
          </div>
          <div>
            <p className="percent">
              已售{' '}
              {Math.ceil((1000 / Math.pow(2, index)) * (Math.random() + 1))}
            </p>
          </div>
          <div className="immediately-btn">立即抢购</div>
        </div>
      </div>
    );
  }
}
