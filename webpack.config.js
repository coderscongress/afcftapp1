
//webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

  module.exports = {
  mode: isProd ? 'production' : 'development',	  
  entry: './src/frontend/index.tsx',
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js', // <-- dynamic filename
  publicPath: '/', 
  clean: true,
   },
   
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  
  devServer: {
  static: {
    directory: path.join(__dirname, 'public'), // Serve public assets
  },
  historyApiFallback: true,
  port: 3000, // <-- frontend port (if using 3000)
  open: true, // ✅ this opens the browser automatically
  proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  ],
},

  
  module: {
    rules: [
      {
        test: /\.tsx?$/, // For TS/TSX files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  
  optimization: {
  splitChunks: {
    chunks: 'all',
  },
},

  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
	isProd && new BundleAnalyzerPlugin(),
    isProd && new CompressionPlugin(),
   ].filter(Boolean),
};