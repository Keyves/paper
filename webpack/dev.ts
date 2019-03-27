import baseConfig from './base'
import helper from './util/helper'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config = helper.merge(baseConfig, {
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map', // cheep-module-eval-source-map
    devServer: {
        inline: true,
        hot: true,
        port: 3000,
        publicPath: '/',
        open: true,
        openPage: 'index.html',
    },
    entry: helper.root('example/debug.ts'),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: helper.root('example/debug.html'),
        }),
    ],
})

export default config
