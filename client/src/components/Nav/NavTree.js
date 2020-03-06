import React, { Component } from 'react'
const arr = (list) => {
  return Array.isArray(list) ? list : []
}

class NavTree extends Component {
  constructor(prop) {
    super(prop)
    this.getTree = this.getTree.bind(this)
    this.createTreeDom = this.createTreeDom.bind(this)
  }
  render() {
    return (
      <div>{this.getTree(this.props.treeData)}</div>
    )
  }
  getTree(treeData) {
    console.log(treeData)
    if (treeData) {
      return this.createTreeDom(treeData)
    }
    return <div>获取数据为空</div>
  }
  createTreeDom(treeData) {
    return arr(treeData).map(item => {
      return (
        <div>
          <div>{item.name}</div>
          {/* {item.children ? this.createTreeDom(item.children) : null} */}
        </div>
      )
    })
  }
}

export default NavTree