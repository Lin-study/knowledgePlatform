import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './page/Main'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Main}></Route>
          {/* <Route path='/login' exact component={Login}></Route>
          <Route path='/write' exact component={Write}></Route>
          <Route path='/detail/:id' exact component={Detail}></Route> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;