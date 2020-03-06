import React, { Component } from 'react'
import api from 'api'
import NavTree from './NavTree'

class Nav extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      treeData: null
    }
    api.getTree().then((res) => {
      this.setState({
        treeData: res.data
      })
    })
  }
  render() {
    return (
      <div>
        {
          this.state.treeData ? <NavTree treeData={this.state.treeData}></NavTree> : <div>正在加载中</div>
        }
      </div>
    )
  }
}
export default Nav