import { IJSONObject } from 'src/@types/global'

const _DEV_ = (process as any).env.NODE_ENV === 'development'

let logger = ({}) as Console

if (_DEV_) {
    logger = console
} else {
    Object.keys(console).forEach(method => (logger as IJSONObject)[method] = () => {/* empty */})
}

export default logger
