const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        login: './src/index.js',           // Entry point for login page
        dashboard: './src/dashboard.js',   // Entry point for dashboard page
    },
    output: {
        filename: '[name].bundle.js',  // Output bundles (e.g., login.bundle.js, dashboard.bundle.js)
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // CSS processing
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',     // Output login HTML in dist folder
            chunks: ['login'],          // Include only login JS bundle
        }),
        new HtmlWebpackPlugin({
            template: './public/dashboard.html',
            filename: 'dashboard.html', // Output dashboard HTML in dist folder
            chunks: ['dashboard'],      // Include only dashboard JS bundle
        }),
    ],
};
