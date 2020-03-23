const fs = require('fs')
const path = require('path')
const rm = require('rimraf')

let list = []
// 过滤的文件夹内容
const filterName = ['img', 'node_modules', '.git']
// 那些路径下的不再显示（模糊匹配）
const filterPath = ['公开课']

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
    if (stats.isDirectory() && !filterPath.find(p => filePath.includes(p) && !filePath.endsWith(p))) {
      item.child = []
      getdir(filePath, item.child)
    }
    list.push(item)
  });
}
getdir('./', list)
// 删除目录
let hasBook = false
if (fs.existsSync('./booklist.md')) {
  console.log('Removing booklist.md');
  hasBook = true
  rm('./booklist.md', (err) => {
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
    fs.writeFile('./booklist.md', string, (err) => {
      if (err) throw err
      console.log('文件写入成功')
    })
  }
}
if (!hasBook) {
  baseBook.writeBook()
}