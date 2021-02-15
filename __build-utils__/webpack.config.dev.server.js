const argv = require('yargs').argv;
const path = require('path');

// const PROXY_PROTOCOL = argv.ssl ? 'https' : 'http';
// const PROXY_HOST = '0.0.0.0';
// const PROXY_PORT = argv.port || 80;

// const proxy = [];

// local php server
// if (!process.env.PROXY_MOCK_SERVER) {
//   proxy.push({
//     context: ['/'],
//     target: `${PROXY_PROTOCOL}://${PROXY_HOST}:${PROXY_PORT}`,
//   });
// }

module.exports = {
  // open: true,
  publicPath: '/',

  contentBase: path.resolve(__dirname, '../__tests__'),
  // contentBase: './',
  // watchContentBase: true,

  clientLogLevel: 'trace',

  // 아래 두 개 옵션을 모두 지정할 경우 “Hot Module Reloading”이 처음 발생한다. 그리고 “Hot Module Reloading”이 안되면 전체 페이지 로딩
  inline: false, // 전체 페이지에 대한 실시간 리로딩(“Live Reloading”)
  hot: false, // 컴포넌트가 수정될 경우 그 수정된 부분만 리로드 해주는 부분 모듈 리로딩(“Hot Module Reloading”)
  bonjour: true,

  // host: PROXY_HOST,
  port: 3000,
  disableHostCheck: true,
  // proxy,
};
