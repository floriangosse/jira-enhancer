const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, argv) => {
	const { mode = 'development' } = argv;

	const isProduction = mode === 'production';

	return {
		mode,
		devtool: isProduction ? false : 'source-map',
		entry: {
			content: './src/content'
		},
		output: {
			path: path.join(__dirname, 'extension'),
			filename: '[name].js'
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					{
						from: '*',
						context: 'src',
						globOptions: {
							ignore: '*.js'
						}
					}
				]
			})
		]
	};
};
