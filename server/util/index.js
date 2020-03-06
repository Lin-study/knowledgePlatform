const fs = require('fs')
const path = require('path')

const getdir = (dir, list = []) => {
  var files = fs.readdirSync(dir);
  files.forEach(function (filename) {
    var filePath = path.join(dir, filename);
    var stats = fs.statSync(filePath);
    let item = {
      filename,
      path: filePath,
      size: stats.size
    }
    if (stats.isDirectory()) {
      item.child = []
      getdir(filePath, item.child)
    }
    list.push(item)
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