const path = require('path');

module.exports = {
    entry: './src/index.js', // Entry point for your application
    output: {
        filename: 'main.js', // Output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
},

    module: {
        rules: [
            {
                test: /\.css$/, // Apply CSS loader
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    mode: 'development', // Set mode to development
};
