var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve( __dirname, './dist' ),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      'components': path.join(__dirname, 'src/components' ),
      'images': path.join(__dirname, 'src/images' )
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

if ( process.env.NODE_ENV === 'production' ) {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat( [
    new webpack.DefinePlugin( {
      'process.env': {
        NODE_ENV: '"production"',
      },
    } ),
    new webpack.optimize.UglifyJsPlugin( {
      sourceMap: true,
      compress: {
        warnings: false,
      },
    } ),
    new webpack.LoaderOptionsPlugin( {
      minimize: true,
    } ),
  ] );
}
