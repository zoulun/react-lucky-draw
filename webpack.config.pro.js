const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const reactBase = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router-dom'
];

module.exports = {
  mode: 'production',
  // entry: './src/index.js',
  entry: {
    index: './src/index.js',
    // reactBase,
    // xlsxVendor: ['xlsx']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.l?[ec]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      'common': path.resolve(__dirname, './src/common'),
      'components': path.resolve(__dirname, './src/components'),
      'containers': path.resolve(__dirname, './src/containers'),
      'lib': path.resolve(__dirname, './src/lib'),
      'srcredux': path.resolve(__dirname, './src/redux')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // },
        vendorx: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendorx',
          chunks: 'all',
          priority: 10,
          minChunks: 1,
          reuseExistingChunk: true
        },
        reactBase: {
          test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|react-router-dom)[\\/]/,
          name: 'reactBase',
          chunks: 'all',
          priority: 20
        },
        xlsxVendor: {
          test: /xlsx/,
          name: 'xlsxVendor',
          chunks: 'all',
          priority: 30
        },
        index: {
          name: "index",
          chunks: "all",
          minChunks: 2,
          priority: 9,
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      title: 'lucky',
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // new CompressionWebpackPlugin({
    //   test: /\.js$/i,
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   threshold: 1000
    // }),
    new BundleAnalyzerPlugin()
  ]
}