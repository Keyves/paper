import path from 'path'
import merge from 'webpack-merge'

const NODE_ENV = process.env.NODE_ENV

export default {
    merge,
    root: (...args: string[]) => path.resolve(__dirname, '../..', ...args),
    env: {
        name: NODE_ENV,
        isDev: NODE_ENV === 'development',
        isProd: NODE_ENV === 'production',
    },
}
