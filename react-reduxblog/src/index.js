import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// BrowserRouter - look at entire URL when determining what to show
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import { PostList, PostNew, PostDetail } from './containers';
import reducers from './reducers';
import './styles/index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={ createStoreWithMiddleware(reducers) }>
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/posts/new" component={ PostNew } />
          <Route path="/posts/:id" component={ PostDetail } />
          <Route path="/" component={ PostList } />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
