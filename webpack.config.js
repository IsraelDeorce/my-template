const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

// In webpack.config.js we can change how webpack behaves by adding or changing:
// entry; output; loaders; plugins; code splitting
module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV || 'development', // Defines default optimizations depending on mode
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/shop.svg'
    }),
    new ESLintPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 9000,
    historyApiFallback: true // will redirect 404s to /index.html
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      { test: /\.js$/, enforce: 'pre', use: ['source-map-loader'] }, // Extracts source maps. 3rd-party libraries having their own source maps.
      { test: /\.html$/i, use: ['html-loader'] }
    ]
  }
}
