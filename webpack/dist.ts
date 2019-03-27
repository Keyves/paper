import baseConfig from './base'
import helper from './util/helper'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const config = helper.merge(baseConfig, {
    entry: {
        paper: helper.root('src'),
    },
    output: {
        path: helper.root('dist'),
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js',
        },
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
        ],
    },
    plugins: [
        new CleanPlugin(['dist'], {
            root: helper.root(),
            verbose: true,
        }),
    ],
})

export default config
