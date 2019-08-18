import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
  handlePageBack() {
    const { leftClick, history } = this.props;
    if (leftClick && typeof leftClick === 'function') {
      leftClick();
    } else {
      history.goBack();
    }
  }

  render() {
    const { title, border, showLeft } = this.props;
    return (
      <header
        className="nav-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          borderBottom: `1px solid ${border ? '#EAECF3' : 'transparent'}`,
          zIndex: 10
        }}
      >
        <NavBar
          mode="light"
          icon={showLeft ? <Icon type="left" /> : ''}
          onLeftClick={this.handlePageBack.bind(this)}
        >
          {title}
        </NavBar>
      </header>
    );
  }
}

export default withRouter(Nav);
