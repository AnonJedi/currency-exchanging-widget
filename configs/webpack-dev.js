const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');


module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    path.join(SRC_DIR, 'index'),
  ],
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.webpack-loader.js', '.web-loader.js', '.loader.js'],
    alias: {
      components: path.resolve(SRC_DIR, 'components/'),
      constants: path.resolve(SRC_DIR, 'constants/'),
      reducers: path.resolve(SRC_DIR, 'reducers/'),
      actions: path.resolve(SRC_DIR, 'actions/'),
      apiUrls: path.resolve(SRC_DIR, 'apiUrls/'),
      utils: path.resolve(SRC_DIR, 'utils/'),
    },
  },
  output: {
    path: DIST_DIR,
    publicPath: '/dist/',
    filename: 'bundle.[hash].js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new CleanWebpackPlugin(['dist/*'], {
      root: ROOT_DIR,
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, '/assets/html/index.html'),
      path: DIST_DIR,
      filename: 'index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],

  module: {
    rules: [
      // js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },

      // styles
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap=true',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap=true',
        ],
      },
    ],
  },
  devServer: {
    contentBase: DIST_DIR,
    historyApiFallback: true,
    port: 3000,
    compress: false,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
