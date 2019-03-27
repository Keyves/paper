import PaperNode from 'src/model/node/abstract/base'

export default abstract class BlockNode extends PaperNode {

    protected _parsePath(from?: number[], to?: number[]) {
        return {
            start: from ? from[from.length - 1] : 0,
            end: to ? to[to.length - 1] : 1,
        }
    }

    deleteContent(from?: number[], to?: number[]) {
        const { start, end } = this._parsePath(from, to)
        if (start === 0 && end === 1) {
            return true
        } else {
            return false
        }
    }
}
