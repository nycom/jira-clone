const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const apiMocker = require('mocker-api');
const { EnvironmentPlugin } = require('webpack');

module.exports = (env, arg) => {
    const DEV = arg.mode && arg.mode !== 'production';
    console.log(DEV ? 'dev mode' : 'production mode');
    return {
        entry: path.join(__dirname, 'src', 'index.js'),
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.[hash].js'
        },
        module: {
            rules: [
                {
                    test: /.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader' },
                        { loader: 'eslint-loader', options: { fix: false } }
                    ]
                },
                {
                    test: /.(css|scss)$/,
                    use: [
                        // MiniCssExtractPlugin.loader,
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /.(jpg|jpeg|png|gif|mp3|svg|ttf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name]-[hash:8].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, 'src', 'index.html')
            }),
            // new MiniCssExtractPlugin({
            //     filename: '[name].css',
            //     chunkFilename: '[id].css'
            // }),
            new EnvironmentPlugin({
                NODE_ENV: DEV ? 'dev' : 'production'
            })
        ],
        devtool: 'source-map',
        devServer: {
            before(app) {
                apiMocker(app, path.resolve('./mocker/index.js'), {
                    proxy: {
                        '/repos/*': 'https://api.github.com/'
                    },
                    changeHost: true
                });
            }
        }
    };
};
