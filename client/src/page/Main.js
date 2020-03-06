import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <Nav></Nav>
      </Fragment>
    )
  }
}

export default Main