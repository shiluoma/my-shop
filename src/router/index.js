import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import NotFound from '../pages/404';

export default class RoutePages extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
