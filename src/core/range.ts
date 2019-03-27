import PaperNode from 'src/model/node/abstract/base'
import Anchor from './anchor'
import EventEmitter from 'wolfy87-eventemitter'
import { createNativeRange } from 'src/util/dom'
import { clone } from 'src/util/lang'
import renderer from 'src/renderer'

enum DIRECTION {
    BACKWARD = 0,
    FORWARD = 1,
}

interface IRangeOptions {
    startAnchor: Anchor
    endAnchor: Anchor
}

export default class PaperRange extends EventEmitter {
    static BACKWARD = DIRECTION.BACKWARD
    static FORWARD = DIRECTION.FORWARD

    startAnchor: Anchor
    endAnchor: Anchor
    direction = DIRECTION.FORWARD

    constructor(opts: IRangeOptions) {
        super()
        this.startAnchor = opts.startAnchor
        this.endAnchor = opts.endAnchor
    }

    setStart(start: Anchor) {
        this.startAnchor = start
    }

    setEnd(end: Anchor) {
        this.endAnchor = end
    }

    isCollapse() {
        return this.startAnchor.equal(this.endAnchor)
    }

    collapse(toStart: boolean) {
        if (toStart) {
            this.endAnchor = clone(this.startAnchor)
        } else {
            this.startAnchor = clone(this.endAnchor)
        }
    }

    setDirection(direction: DIRECTION) {
        this.direction = direction
    }

    toNativeRange(): Range {
        return createNativeRange(this.startAnchor.node, this.startAnchor.offset, this.endAnchor.node, this.endAnchor.offset)
    }

    toStoreRange() {
        const { startAnchor, endAnchor } = this
        const startNode = renderer.getPaperNode(startAnchor.node as Text)
        const endNode = renderer.getPaperNode(endAnchor.node as Text)
        const startPath = toPath(startNode)
        const endPath = toPath(endNode)

        startPath.push(startAnchor.offset)
        endPath.push(endAnchor.offset)

        return {
            start: {
                path: startPath,
            },
            end: {
                path: endPath,
            },
        }
    }
}

function toPath(pNode: PaperNode) {
    const path = []
    let parentNode = pNode.parentNode
    while (parentNode) {
        path.push(parentNode.children.indexOf(pNode))
        pNode = parentNode
        parentNode = pNode.parentNode
    }
    return path.reverse()
}
