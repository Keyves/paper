import baseConfig from './base'
import helper from './util/helper'

const config = helper.merge(baseConfig, {
    devtool: 'inline-source-map',
})

export default config
