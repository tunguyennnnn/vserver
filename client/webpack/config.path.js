const path = require('path')

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '..', '..', 'server/public'),
  entryPath: path.resolve(__dirname, '..', 'src/index.js'),
  templatePath: path.resolve(__dirname, '..', 'src/index.html')
}
