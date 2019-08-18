import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import reducer from "./store/reducers";
import "./styles/base.less"
import RoutePages from "./router";
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
))

ReactDOM.render(
<Provider store={store}>
    <RoutePages />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
