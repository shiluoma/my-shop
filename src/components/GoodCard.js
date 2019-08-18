import React, { PureComponent } from 'react';
import '../styles/components/goodCard.less';

export default class GoodCard extends PureComponent {
  render() {
    const { detailData } = this.props;
    return (
      <div className="goods_item">
        <div className="goods_item01">
          <img src={detailData.src} alt=""></img>
        </div>
        <div className="goods_item01_pro">
          <p className="item-description">{detailData.description}</p>
          <p>{detailData.product_name}</p>
          <div className="now-price">
            <p>￥</p>
            {detailData.now_price}
            <p>￥{detailData.old_price}</p>
          </div>
          <div>
            <p className="percent">已售 {detailData.sold}</p>
          </div>
          <div className="immediately-btn">立即抢购</div>
        </div>
      </div>
    );
  }
}
