const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            app: path.resolve(__dirname, 'src/app/'),
            composites: path.resolve(__dirname, 'src/composites/'),
            entities: path.resolve(__dirname, 'src/entities/'),
            features: path.resolve(__dirname, 'src/features/'),
            layouts: path.resolve(__dirname, 'src/layouts/'),
            pages: path.resolve(__dirname, 'src/pages/'),
            shared: path.resolve(__dirname, 'src/shared/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        open: true,
        historyApiFallback: true,
    },
};
