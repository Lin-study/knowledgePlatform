import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import routeList from '../share/routerList';

//渲染index
let render = module.hot ? ReactDom.render : ReactDom.hydrate
render(<BrowserRouter>
  <App routeList={routeList} />
</BrowserRouter>
  , document.getElementById('root'))

  if (module.hot) {
    module.hot.accept();
  }
