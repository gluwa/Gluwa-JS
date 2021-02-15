// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const devServer = require('./webpack.config.dev.server');

// const entry = Object.keys(commonConfig.entry).reduce((_entry, _entryPath) => {
//   const devEntry = ['webpack/hot/dev-server'];

//   return Object.assign(_entry, { [_entryPath]: devEntry });
// }, {});

module.exports = webpackMerge.merge(commonConfig, {
  // entry: commonConfig.entry,
  // plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  // devtool: 'cheap-module-source-map',
  devServer,
  // devServer: {
  //   // host: 'localhost',
  //   // overlay: 빌드 시 에러나 경고를 브라우져 화면에 표시
  //   overlay: true,
  //   // stats: 메시지 수준. 'none', 'errors-only', 'minimal', 'normal', 'verbose'
  //   stats: 'normal',
  //   // port,
  //   // historyApiFallback: true,
  //   // hot: true,
  //   // open: true,
  //   // compress: true,
  // },
});
