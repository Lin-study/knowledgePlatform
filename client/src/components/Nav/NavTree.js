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
    if (treeData) {
      return this.createTreeDom(treeData)
    }
    return <div>获取数据为空</div>
  }
  createTreeDom(treeData) {
    console.log(treeData)
    return arr(treeData).map(item => {
      return (
        <div  key={item.id}>
          <div>{item.filename}</div>
          {item.child ? this.createTreeDom(item.child) : null}
        </div>
      )
    })
  }
}

export default NavTree