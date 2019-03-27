import PaperRange from 'src/core/range'
import PaperTextNode from 'src/model/node/abstract/text'
import PaperCompNode from 'src/model/node/abstract/comp'
import PaperInlineNode from 'src/model/node/abstract/inline'
import renderer from 'src/renderer'
import { combineInlineNode } from 'src/util/pdom'

export default function deleteContent(range: PaperRange) {
    const storeRange = range.toStoreRange()
    const startAnchor = range.startAnchor
    const endAnchor = range.endAnchor
    const { start, end } = storeRange
    const from = start.path
    const to = end.path
    let currNode
    let prevNode
    let parentNode
    let tempOffset
    let domNode

    if (range.isCollapse()) {
        currNode = renderer.getPaperNode(startAnchor.node as Text)
        if (currNode && currNode instanceof PaperTextNode) {
            if (startAnchor.offset === 0) {
                if (currNode.size === 0) {
                    currNode.remove()
                }
                if (currNode.prevNode) {
                    prevNode = currNode.prevNode
                    tempOffset = prevNode.size - 1
                    prevNode.deleteText(tempOffset, 1)
                    domNode = renderer.getDOMNode(prevNode.id)
                    startAnchor.setNode(domNode)
                    startAnchor.setOffset(tempOffset)
                    endAnchor.setNode(domNode)
                    endAnchor.setOffset(tempOffset)
                } else {
                    parentNode = currNode.parentNode
                    if (parentNode) {
                        prevNode = parentNode.prevNode
                        while (prevNode instanceof PaperCompNode) {
                            prevNode = prevNode.children[prevNode.children.length - 1]
                        }
                    } else {
                        return
                    }
                    if (prevNode instanceof PaperInlineNode) {
                        parentNode = currNode.parentNode
                        if (parentNode && prevNode.parentNode) {
                            parentNode.remove()
                            for (const tempNode of parentNode.children) {
                                prevNode.parentNode.append(tempNode)
                            }
                        }
                        domNode = renderer.getDOMNode(prevNode.id)
                        startAnchor.setNode(domNode)
                        startAnchor.setOffset(prevNode.size)
                        endAnchor.setNode(domNode)
                        endAnchor.setOffset(prevNode.size)
                        if (combineInlineNode(prevNode, currNode)) {
                            currNode.remove()
                        }
                    } else {
                        return
                    }
                }
            } else if (startAnchor.offset === 1 && currNode.size === 1) {
                // 当节点内容为空时，range.getClientRects获取不到位置信息
                if (!currNode.prevNode && currNode.nextNode) {
                    currNode.remove()
                    domNode = renderer.getDOMNode(currNode.nextNode.id)
                    startAnchor.setNode(domNode)
                    startAnchor.setOffset(0)
                    endAnchor.setNode(domNode)
                    endAnchor.setOffset(0)
                }
            } else {
                tempOffset = startAnchor.offset - 1
                currNode.deleteText(tempOffset, 1)
                startAnchor.setOffset(tempOffset)
                endAnchor.setOffset(tempOffset)
            }
        }
        if (currNode.parentNode) {
            currNode.parentNode.lineWrap()
        }
    } else {
        this.document.deleteContent(from, to)
        range.collapse(true)
    }
}
