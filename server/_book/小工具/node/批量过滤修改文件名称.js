let fs = require('fs')
const path = require('path')

const fliterList = ['（精校版全本）']

const getdir = function(dir) {
  var files = fs.readdirSync(dir)
  files
    .filter(f => fliterList.find(l => f.includes(l)))
    .forEach(function(filename) {
      var filePath = path.join(dir, filename)
      var stats = fs.statSync(filePath)
      if (stats.isFile()) {
        let newfilename = filename
        fliterList.forEach(f => {
          newfilename = newfilename.replace(f, '')
        })
        fs.renameSync(filePath, path.join(dir, newfilename))
      }
    })
}
getdir('./小说')
