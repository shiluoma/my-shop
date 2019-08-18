import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";

class Nav extends Component {

  handlePageBack() {
    const { leftClick } = this.props;
    if (leftClick && typeof(leftClick) === 'function'){
      leftClick();
    } else {
      this.props.history.goBack();
    }
  }

  render() {
	  const { title, border } = this.props;
    return(
	  <div 
		  className="nav-bar" 
			style={{ position: "fixed", top: 0, left: 0, width: "100%", borderBottom: `1px solid ${border ? "#EAECF3" : "transparent"}`, zIndex: 10}}>
        <NavBar
		      mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.handlePageBack.bind(this)}
        >{title || "我的商城"}</NavBar>
      </div>
    )
  }
}

export default withRouter(Nav);
