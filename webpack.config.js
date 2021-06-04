const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

console.log('webpack config, process.env.NODE_ENV: ', process.env.NODE_ENV)

const env = {
    RUNTIME_MODE: JSON.stringify(process.env.NODE_ENV),
    PRODUCTION: JSON.stringify(true),
    VERSION: JSON.stringify('v0.01'),
    BROWSER_SUPPORTS_HTML5: true,
    TWO: '1+1',
    'typeof window': JSON.stringify('object')
}

if (process.env.NODE_ENV == 'pro' || process.env.NODE_ENV == 'test') {
    env.API_URL = JSON.stringify('https://points.humanrisk.cn')
}

console.log('webpack build by env: ', env)

const plugins = [
    new webpack.DefinePlugin(env),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
        title: 'Caching',
        template: './src/index.html'
    }),
    new CopyPlugin({
        patterns: [{
            from: "./src/assets",
            to: 'assets'
        }],
    }),
    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
    new MomentLocalesPlugin({
        localesToKeep: ['zh-cn'],
    })
]

let externals, dist

externals = {
    "pixi.js": "PIXI",
    "@inlet/react-pixi": "React",
    'axios': 'axios',
    'moment': 'moment',
    'moment/locale/zh-cn': 'moment.locale',
    'moment-duration-format': 'moment.duration',
}

plugins.push(new BundleAnalyzerPlugin())

dist = path.resolve(process.cwd(), 'dist/dev')

console.log('webpack config externals:', externals)

const webpackConfig = {
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 1000,
        host: '0.0.0.0'
    },
    entry: {
        app: ["./src/app.js"]
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].[chunkhash].js',
        path: dist,
        clean: true,
    },
    cache: {
        type: 'filesystem',
        cacheLocation: path.resolve(__dirname, '.cache')
    },
    externals: externals,
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devtool: "inline-source-map",
    resolve: {
        alias: { "pixi.js": "pixi.js-legacy" },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset',
            },
            {
                test: /\.json$/,
                type: 'javascript/auto',
                exclude: /node_modules/,
                loader: 'json-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: plugins,
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i, //匹配参与压缩的文件
                parallel: true, //使用多进程并发运行
                extractComments: true, //将注释剥离到单独的文件中
                terserOptions: {
                    ecma: 5,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    module: false,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                    safari10: true
                }
            })
        ]
    }
};

module.exports = webpackConfig;