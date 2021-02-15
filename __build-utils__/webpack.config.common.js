const path = require('path');

module.exports = {
  entry: { Gluwa: 'index' },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src/'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[jt]sx?$/,
        include: path.resolve(__dirname, '../src/'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
              compact: true,
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: path.resolve(__dirname, '../.eslintrc.js'),
            },
          },
        ],
      },
    ],
  },
};
