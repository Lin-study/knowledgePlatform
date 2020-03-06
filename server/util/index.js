const fs = require('fs')
const path = require('path')

// 生成随机字符串
const randomStr = () => Math.random().toString(16).substring(2, 15);
// 过滤的文件夹内容
const filterName = ['img', 'node_modules', '.git', '.gitignore', 'README.md', 'updateBookList.js', 'code', '.vscode','package.json']
// 那些路径下的不再显示（模糊匹配）
const filterPath = ['\\公开课\\', '\\框架\\', 'vue-webpack分析', '小工具\\页面\\', '常用代码片段']
// 变为父级的名称
const toParentName = ['index.md', 'index.js']

const getdir = (dir, list = [], parentName) => {
  var files = fs.readdirSync(dir).reverse();
  files.forEach(function (filename) {
    if (filterName.includes(filename)) return
    var filePath = path.join(dir, filename);
    var stats = fs.statSync(filePath);
    let item = {
      id: randomStr(),
      // 如果是index.js 那么我就取父级的名称
      filename: toParentName.includes(filename) ? parentName : filename,
      path: filePath,
      size: stats.size
    }
    list.push(item)
    if (stats.isDirectory() && !filterPath.find(p => filePath.includes(p))) {
      getdir(filePath, item.child = [], filename)
    }
  });
  return list
}

const getBook = (bookPath) => {
  return fs.readFileSync(bookPath)
}

module.exports = {
  getdir,
  getBook
}