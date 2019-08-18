import React, { Component } from "react";

export default (params) => {
  return (
    <div
      className="LoadModal"
      style={{
        visibility: params.isLoading ? 'visible' : 'hidden',
        opacity: params.isLoading ? 1 : 0
      }}
    >
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  )
}


