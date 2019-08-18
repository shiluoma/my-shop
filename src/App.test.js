import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers';
import './styles/base.less';
import RoutePages from './router';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <RoutePages />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNod;
});
