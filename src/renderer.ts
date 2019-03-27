import { InlineNode, IPaperStyle } from 'src/model/node'
import Caliper from 'src/lib/caliper'

type InlineDOMNode = Text | HTMLImageElement | HTMLBRElement | HTMLHRElement

class Renderer {
    inlinePaperNodeMap: Map<InlineDOMNode, InlineNode>
    inlineDOMNodeMap: Map<number, InlineDOMNode>

    private _caliper: Caliper

    constructor() {
        this.inlinePaperNodeMap = new Map()
        this.inlineDOMNodeMap = new Map()
        this._caliper = new Caliper()
    }

    setDOMNode(pNodeId: number, domNode: InlineDOMNode) {
        this.inlineDOMNodeMap.set(pNodeId, domNode)
    }

    getDOMNode(pNodeId: number): InlineDOMNode {
        return this.inlineDOMNodeMap.get(pNodeId) as InlineDOMNode
    }

    deleteDOMNode(pNodeId: number) {
        this.inlineDOMNodeMap.delete(pNodeId)
    }

    setPaperNode(domNode: InlineDOMNode, pNode: InlineNode) {
        this.inlinePaperNodeMap.set(domNode, pNode)
    }

    getPaperNode(domNode: InlineDOMNode): InlineNode {
        return this.inlinePaperNodeMap.get(domNode) as InlineNode
    }

    deletePaperNode(domNode: InlineDOMNode) {
        this.inlinePaperNodeMap.delete(domNode)
    }

    setCaliperStyle(style: IPaperStyle) {
        this._caliper.setStyle(style)
    }

    measure(value: string) {
        return this._caliper.measure(value)
    }
}

export default new Renderer()
