const fs = require('fs')
const path = require('path')
const rm = require('rimraf')

let list = []
// 过滤的文件夹内容
const filterName = ['img', 'node_modules', '.git', '.gitignore', 'README.md', 'updateBookList.js', 'code', '.vscode','package.json']
// 那些路径下的不再显示（模糊匹配）
const filterPath = ['\\公开课\\', '\\框架\\', 'vue-webpack分析', '小工具\\页面\\', '常用代码片段']

const getdir = function (dir, list) {
  var files = fs.readdirSync(dir);
  files.forEach(function (filename) {
    if (filterName.includes(filename)) return
    var filePath = path.join(dir, filename);
    var stats = fs.statSync(filePath);
    let item = {
      filename,
      path: filePath,
      size: stats.size
    }
    if (stats.isDirectory() && !filterPath.find(p => filePath.includes(p))) {
      getdir(filePath, item.child = [])
    }
    list.push(item)
  });
}
getdir('./', list)
// 删除目录
let hasBook = false
if (fs.existsSync('./README.md')) {
  console.log('Removing README.md');
  hasBook = true
  rm('./README.md', (err) => {
    if (err) throw err
    baseBook.writeBook()
  });
}
let string = '# 目录\n'
// 生成md文件
const baseBook = {
  arr: ['*', '+', '-'],
  getIdent(index, maxIndex) {
    if (!maxIndex) maxIndex = index
    if (index >= 3) return this.getIdent(index - 3, maxIndex)
    return ''.padStart(maxIndex * 2) + this.arr[index]
  },
  createBookList(list, index) {
    let ident = this.getIdent(index)
    list.forEach(item => {
      string += `${ident} [${item.filename}](./${item.path})\n`
      if (item.child) {
        this.createBookList(item.child, index + 1)
      }
    })
  },
  writeBook() {
    this.createBookList(list, 0)
    fs.writeFile('./README.md', string, (err) => {
      if (err) throw err
      console.log('文件写入成功')
    })
  }
}
if (!hasBook) {
  baseBook.writeBook()
}