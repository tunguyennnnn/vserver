const configPath = require('./config.path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

// const copyFolders = [
//   {
//     from: configPath.imagesFolder,
//     to: configPath.outputImageFolder,
//     toType: 'dir'
//   }
// ]

module.exports = {
  mode: 'production',
  output: {
    filename: `[name].[hash].js`,
    path: configPath.outputPath,
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'source-map'
}
