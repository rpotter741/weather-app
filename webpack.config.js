const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Settlement Management Sheet",
           
        }),
        new FaviconsWebpackPlugin('./src/logo.png'),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
       },
       {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        },
        {
        test: /\.html$/i,
        loader: 'html-loader',
        },
     ],
   },
  };