var path = require('path');
const glob = require('glob');
var webpack = require('webpack');
const PurifyCSSPlugin = require('purifycss-webpack')
var inProduction = (process.env.NODE_ENV == "production");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app:[
			'./src/main.js',
			'./src/main.scss'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss/,
				use: ExtractTextPlugin.extract({
					use:['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test:/\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|eot|tff|woff2)$/,
				loader: 'file-loader',
				options:{
					name: 'images/[name].[hash].[ext]'
				}
			}
		]
	},
	plugins: [

		new ExtractTextPlugin('[name].css'),

		
		new webpack.LoaderOptionsPlugin({
			minimize: inProduction
		}),

		new PurifyCSSPlugin({
	      paths: glob.sync(path.join(__dirname, 'index.html')),
	      minimize: inProduction
	    })
	]
}

if(inProduction){
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}