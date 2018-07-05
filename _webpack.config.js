const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')



module.exports = {
  entry: {
    app: './src/js/index.jsx'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js' , '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/', // this line will remove the dist from images addres in app.css after build
              // problem was if you use any image in sass files the addres swould be like /distimg/blah.jpeg but this line will; convert it to img/blah.jpeg
              context: 'src/images' // grab all images from here and keep folder structure
            }
          }
        ]
      }, 
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                outputPath: 'fonts/',
                publicPath: 'fonts/', // this line will remove the dist from fonts addres in app.css after build
                context: 'src/fonts' // grab all fonts from here and keep folder structure
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'AhmadMirzaei',
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
      }
    }),

    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    })
  ],

  devServer: {
    contentBase: path.join(__dirname , 'dist'),
    compress: true,
    port: 3000,
    open: true,
    // https: true,
    // host: '127.0.0.5',
    historyApiFallback: true,
    stats: 'minimal',
  }
}
