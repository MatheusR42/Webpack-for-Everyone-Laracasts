var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var inProduction = (process.env.NODE_ENV == "production");

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
		})
	]
}

if(inProduction){
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}