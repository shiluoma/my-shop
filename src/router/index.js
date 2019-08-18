import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import NotFound from '../pages/404';
import GoodsList from '../pages/list';
import GoodsDetail from '../pages/detail';
import Mycarts from '../pages/cart';

export default class RoutePages extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GoodsList}></Route>
          <Route exact path="/goodsdetail/:id" component={GoodsDetail}></Route>
          <Route exact path="/mycart" component={Mycarts}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
