const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        // loader: 'babel-loader',
        // query: {
        //   presets: ['es2015', 'react', 'stage-0'],
        // }
      },
      {
        // test: /(\.css|\.less)$/,
        test: /\.l?[ec]ss$/,
        use: ['style-loader', 'css-loader', 'less-loader']
        // loader: 'style-loader!css-loader!less-loader!postcss-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      'common': path.resolve(__dirname, './src/common'),
      'components': path.resolve(__dirname, './src/components'),
      'containers': path.resolve(__dirname, './src/containers'),
      'lib': path.resolve(__dirname, './src/lib')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react',
      template: './src/index.html'
    })
  ]
};