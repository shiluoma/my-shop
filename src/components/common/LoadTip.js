import React, { Component } from "react";

export default class LoadTip extends React.Component {
  render() {
    const { getting, all, handleClick, message } = this.props;
    let showMsg;
    if (message) {
      showMsg = message;
    } else if (getting) {
      showMsg = "加载中...";
    } else if (all && !message && !getting) {
      showMsg = "没有更多内容了";
    } else {
      showMsg = "上拉加载更多";
    }
    return (
      <div
        onClick={handleClick || function () { }}
        style={{
          "color": "#999",
          "fontSize": "0.24rem",
          "lineHeight": "0.5rem",
          "textAlign": "center",
          "height": "0.5rem",
        }}>
        {
          showMsg
        }
      </div>
    );
  }
}
