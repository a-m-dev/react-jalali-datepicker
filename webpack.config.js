var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {

  entry: { 
    app: './src/js/app.jsx',
    // about: './path/to/about/journy.jsx'
  },

  output: {
    path: path.resolve(__dirname , 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader' , 'sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/'
            }
          }
        ]
      }
      // loaders: [
      //   {
      //     test: /\.jsx?$/,
      //     exclude: /(node_modules|bower_components)/,
      //     loader: 'babel-loader',
      //     query: {
      //       presets: ['react', 'es2015', 'stage-0'],
      //       plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
      //     }
      //   }
      // ]
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      filename: 'index.html',
      template: './src/index.html',
    }),

    // // Second .html page 
    // // this method is not good for multiple html pages 
    // // it is good for 404 and pages like that 
    // new HtmlWebpackPlugin({
    //   title: 'About',
    //   filename: 'about.html',
    //   chunks: ['about'], // same about from entry
    //   template: './src/about.html',
    // }),

    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx'] 
  },

  devServer: {
    contentBase: '/dist',
    compress: true,
    port: 5050,
    open: true,
    historyApiFallback: true,
    stats: 'errors-only'
  }

}
