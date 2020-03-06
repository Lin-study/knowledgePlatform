import React, { Component } from 'react'
import api from 'api'
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
    return arr(treeData).map(item => {
      return (
        <div  key={item.id}>
          <div style={{color: item.isDirectory ? null : 'skyblue'}} onClick={() => this.getBookBody(item)}>{item.filename}</div>
          {item.isDirectory && item.child ? this.createTreeDom(item.child) : null}
        </div>
      )
    })
  }
  getBookBody(item) {
    api.getBook(item.path).then(res => {
      console.log(res)
    })
    console.log(item)
  }
}

export default NavTree