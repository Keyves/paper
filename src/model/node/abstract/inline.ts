import { PaperNode, ParagraphNode, LineNode } from 'src/model/node'

export default abstract class InlineNode extends PaperNode {
    lineNode: LineNode | null = null
    parentNode: ParagraphNode | null = null

    get size() {
        return 1
    }

    protected _parsePath(from?: number[], to?: number[]) {
        return {
            start: from ? from[from.length - 1] : 0,
            end: to ? to[to.length - 1] : this.size,
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

    setLineNode(lineNode: LineNode) {
        this.lineNode = lineNode
    }
}
