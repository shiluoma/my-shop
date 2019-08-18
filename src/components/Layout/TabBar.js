// 标签栏
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import '../../styles/components/tabBar.less';

const staticPath = process.env.STATIC_PATH;
const Item = TabBar.Item;

const tabs = [
  {
    title: '商品',
    name: 'goods',
    url: `${staticPath}/tabbar/home.png`,
    as: { pathname: '/list' },
    activeUrl: `${staticPath}/tabbar/home_sel.png`
  },
  {
    title: '购物车',
    name: 'cart',
    as: { pathname: '/cart' },
    url: `${staticPath}/tabbar/buycar.png`,
    activeUrl: `${staticPath}/tabbar/buycar_sel.png`
  }
];

class TabBars extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeTab(tab) {
    const { doubleClickTab } = this.props;
  }

  render() {
    let { tabActive } = this.props;
    return (
      <footer className="tabBar">
        <TabBar
          tintColor="red"
          unselectedTintColor="#8C95A5"
          prerenderingSiblingsNumber="0"
          tabBarPosition="bottom"
        >
          {tabs.map(tab => {
            return (
              <Item
                onPress={this.changeTab.bind(this, tab)}
                icon={
                  <div
                    style={{
                      width: '.4rem',
                      height: '.4rem',
                      marginBottom: '4px',
                      background: `url(${tab.url}) center center / .4rem .4rem no-repeat`
                    }}
                  />
                }
                selected={tabActive == tab.name}
                selectedIcon={
                  <div
                    style={{
                      width: '.4rem',
                      height: '.4rem',
                      marginBottom: '4px',
                      background: `url(${tab.activeUrl}) center center / .4rem .4rem no-repeat`
                    }}
                  />
                }
                title={tab.title}
                key={tab.title}
              />
            );
          })}
        </TabBar>
      </footer>
    );
  }
}

export default withRouter(TabBars);
