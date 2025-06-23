//Build with
//npx webpack --config webpack.server.config.js
//Run 
//node dist/server.js


const path = require('path');

module.exports = {
  entry: './src/server.ts',
  target: 'node',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
