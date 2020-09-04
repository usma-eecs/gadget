const path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	devServer: {
		inline: false,
		disableHostCheck: true,
		contentBase: '../',
		publicPath: '/canvas/dist/',
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},
	// we don't import our own jQuery because:
	// 1) it makes the bundle bigger and slower to load
	// 2) Canvas's jQuery is already configured for CSRF tokens and whatnot
	externals: {
    jquery: 'jQuery'
  },
	output: {
		filename: 'gadget.bundle.js',
		path: path.resolve(__dirname, '../canvas/'),
	}
};
