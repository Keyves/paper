import helper from './util/helper'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'

const config = {
    stats: {
        hash: false,
        colors: true,
        chunks: false,
        version: false,
        children: false,
        timings: true,
    },
    output: {
        publicPath: './',
        filename: '[name].js',
    },
    resolve: {
        alias: {
            example: helper.root('example'),
            src: helper.root('src'),
            vue: 'vue/dist/vue.js',
        },
        extensions: ['.js', '.ts', '.vue'],
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'style-loader!css-loader!sass-loader',
                },
            },
            exclude: /\/node_modules\//,
        }, {
            test: /\.ts$/,
            use: [{
                loader: 'awesome-typescript-loader',
            }, {
                loader: 'tslint-loader',
            }],
            exclude: /\/node_modules\//,
        }, {
            test: /\.s?css$/,
            use: [{
                loader: helper.env.isProd ? MiniCSSExtractPlugin.loader as any : 'style-loader',
            }, {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                },
            }, {
                loader: 'sass-loader',
            }],
        }],
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
}

export default config
