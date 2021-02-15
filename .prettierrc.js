// prettier 은 기본적으로 .editorconfig 파일을 고려합니다. .prettierrc.js 에서 editorconfig : true로 제어가능
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  endOfLine: 'lf',
  trailingComma: 'all', // comma 항상 붙이기
  bracketSpacing: true, // 객체리터럴에서 { } 사이에 공백을 넣을 것인지
  arrowParens: 'always', // (x) => x : always | x => x : avoid
};
