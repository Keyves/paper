import renderer from 'src/renderer'
import { ParagraphNode, TextNode, InlineNode } from 'src/model/node'
import PaperRange from 'src/core/range'
import { looseEqualTextNode } from 'src/util/pdom'

function filterEmptyRangeNode(pNodes: InlineNode[], range: PaperRange) {
    if (pNodes.length < 1) {
        return []
    }

    const { startAnchor, endAnchor } = range
    const startOffset = startAnchor.offset
    const endOffset = endAnchor.offset
    let startPaperNode: InlineNode
    let endPaperNode: InlineNode
    // 处在开始节点的尾部或者结束节点的头部（意味着该选中内容为空）则过滤该节点
    if (startOffset === pNodes[0].size) {
        pNodes.shift()
        startPaperNode = pNodes[0]
        startAnchor.setNode(renderer.getDOMNode(startPaperNode.id))
        startAnchor.setOffset(0)
    }
    if (endOffset === 0) {
        pNodes.pop()
        endPaperNode = pNodes[pNodes.length - 1]
        endAnchor.setNode(renderer.getDOMNode(endPaperNode.id))
        endAnchor.setOffset(endPaperNode.size)
    }
    return pNodes
}

export default function italic(range: PaperRange) {
    if (range.isCollapse()) {
        return
    }
    const storeRange = range.toStoreRange()
    const { start, end } = storeRange
    const from = start.path
    const to = end.path
    const selectedNodes = filterEmptyRangeNode(this.document.getInterNodes(from, to), range)
    const startAnchor = range.startAnchor
    const endAnchor = range.endAnchor
    const startOffset = startAnchor.offset
    const endOffset = endAnchor.offset
    const startPaperNode = selectedNodes[0]
    const endPaperNode = selectedNodes[selectedNodes.length - 1]
    const pStyle = { fontWeight: selectedNodes.every((pNode: any) => pNode.style.fontWeight === 'bold') ? 'normal' : 'bold' }
    let newStartOffset = startOffset
    let newEndOffset = endOffset
    let cloneNode

    if (startPaperNode instanceof TextNode && endPaperNode instanceof TextNode) {
        const startRichChars = startPaperNode.getRichChars()
        const endRichChars = endPaperNode.getRichChars()

        if (startPaperNode === endPaperNode) {
            const newNodes = []

            if (startOffset !== 0) {
                cloneNode = startPaperNode.clone()
                cloneNode.setText(startRichChars.slice(0, startOffset))
                newNodes.push(cloneNode)
                newStartOffset = 0
                // 单一节点时，更改起始锚点偏移量需同步更改结束锚点
                newEndOffset = endOffset - startOffset
            }
            newNodes.push(startPaperNode)
            if (endOffset !== endPaperNode.size) {
                cloneNode = endPaperNode.clone()
                cloneNode.setText(endRichChars.slice(endOffset))
                newNodes.push(cloneNode)
            }
            startPaperNode.setText(startRichChars.slice(startOffset, endOffset))
            if (startPaperNode.parentNode) {
                startPaperNode.parentNode.replace(startPaperNode.parentNode.children.indexOf(startPaperNode), 1, newNodes)
            }
        } else {
            if (startOffset !== 0) {
                cloneNode = startPaperNode.clone()
                cloneNode.setText(startRichChars.slice(0, startOffset))
                startPaperNode.setText(startRichChars.slice(startOffset))
                if (startPaperNode.parentNode) {
                    startPaperNode.parentNode.insert(startPaperNode.parentNode.children.indexOf(startPaperNode), cloneNode)
                }
                newStartOffset = 0
            }
            if (endOffset !== endPaperNode.size) {
                cloneNode = endPaperNode.clone()
                cloneNode.setText(endRichChars.slice(endOffset))
                endPaperNode.setText(endRichChars.slice(0, endOffset))
                if (endPaperNode.parentNode) {
                    endPaperNode.parentNode.insert(endPaperNode.parentNode.children.indexOf(endPaperNode) + 1, cloneNode)
                }
            }
        }

        selectedNodes.forEach((pNode: InlineNode) => pNode.mergeStyle(pStyle))

        let prevNode
        let currNode
        let nextNode
        let i

        // combine boundary point text nodes
        currNode = startPaperNode
        prevNode = currNode.prevNode
        if (prevNode && looseEqualTextNode(prevNode, currNode)) {
            newStartOffset = prevNode.size
            if (selectedNodes.length === 1) {
                newEndOffset = prevNode.size + endOffset
            }
            currNode.insertText(prevNode.getRichChars(), 0)
            prevNode.remove()
        }
        currNode = endPaperNode
        nextNode = currNode.nextNode
        if (nextNode && looseEqualTextNode(currNode, nextNode)) {
            newEndOffset = currNode.size
            currNode.appendText(nextNode.getRichChars())
            nextNode.remove()
        }

        if (selectedNodes.length > 1) {
            // combine inner text nodes
            currNode = startPaperNode
            for (i = 1; i < selectedNodes.length - 1; i++) {
                nextNode = selectedNodes[i]
                if (looseEqualTextNode(currNode, nextNode)) {
                    (currNode as TextNode).appendText((nextNode as TextNode).getRichChars())
                    nextNode.remove()
                } else {
                    currNode = nextNode
                }
            }
            nextNode = endPaperNode
            if (looseEqualTextNode(currNode, nextNode)) {
                if (currNode !== startPaperNode) {
                    newEndOffset = currNode.size
                    nextNode.insertText((currNode as TextNode).getRichChars(), 0)
                    currNode.remove()
                } else {
                    (currNode as TextNode).appendText(nextNode.getRichChars())
                    nextNode.remove()
                    endAnchor.setNode(startAnchor.node)
                    newEndOffset = currNode.size
                }
            }
        }

        startAnchor.setOffset(newStartOffset)
        endAnchor.setOffset(newEndOffset)

        const parentNodeMap = new Map()
        selectedNodes.forEach((pNode: TextNode) => parentNodeMap.set(pNode.parentNode, true))
        Array.from(parentNodeMap.keys()).forEach((pNode: ParagraphNode) => pNode.lineWrap())
    }
}
