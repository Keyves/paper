import PaperRange from 'src/core/range'
import { PaperNode, TextNode } from 'src/model/node'
import renderer from 'src/renderer'
import { clone } from 'src/util/lang'
import { looseEqualTextNode } from 'src/util/pdom'

export default function bold(range: PaperRange) {
    const storeRange = range.toStoreRange()
    const { start, end } = storeRange
    const from = start.path
    const to = end.path
    const pNodes = this.document.getInterNodes(from, to)
    const startAnchor = range.startAnchor
    const endAnchor = range.endAnchor
    let startOffset = startAnchor.offset
    let endOffset = endAnchor.offset
    let startPaperNode: TextNode
    let endPaperNode: TextNode
    let startText: string
    let endText: string
    let pStyle: any

    if (!range.isCollapse()) {
        // 处在开始节点的尾部或者结束节点的头部（意味着该选中内容为空）则过滤该节点
        if (startOffset === pNodes[0].size) {
            pNodes.shift()
            startPaperNode = pNodes[0]
            startText = startPaperNode.text
            startOffset = 0
            startAnchor.setNode(renderer.getDOMNode(startPaperNode.id))
        } else {
            startPaperNode = pNodes[0]
            startText = startPaperNode.text
        }
        if (endOffset === 0) {
            pNodes.pop()
            endPaperNode = pNodes[pNodes.length - 1]
            endText = endPaperNode.text
            endOffset = endText.length
            endAnchor.setNode(renderer.getDOMNode(endPaperNode.id))
        } else {
            endPaperNode = pNodes[pNodes.length - 1]
            endText = endPaperNode.text
        }

        pStyle = { fontWeight: pNodes.every((pNode: any) => pNode.style.fontWeight === 'bold') ? 'normal' : 'bold' }

        if (startPaperNode === endPaperNode) {
            const newNodes = []
            if (startOffset !== 0) {
                newNodes.push(clone(startPaperNode, {
                    text: startText.substring(0, startOffset),
                }))
                startAnchor.setOffset(0)
                // 单一节点时，更改起始锚点偏移量需同步更改结束锚点
                endAnchor.setOffset(endOffset - startOffset)
            }
            newNodes.push(startPaperNode)
            if (endOffset !== endText.length) {
                newNodes.push(clone(endPaperNode, {
                    text: endText.substring(endOffset),
                }))
                endAnchor.setOffset(endOffset - startOffset)
            }
            if (startPaperNode.parentNode) {
                startPaperNode.parentNode.replace(startPaperNode.parentNode.children.indexOf(startPaperNode), 1, newNodes)
            }
            startPaperNode.setText(startText.substring(startOffset, endOffset))
        } else {
            if (startOffset !== 0) {
                if (startPaperNode.parentNode) {
                    startPaperNode.parentNode.insert(startPaperNode.parentNode.children.indexOf(startPaperNode), clone(startPaperNode, {
                        text: startText.substring(0, startOffset),
                    }))
                }
                startPaperNode.setText(startText.substring(startOffset))
                startAnchor.setOffset(0)
            }

            if (endOffset !== endText.length) {
                if (endPaperNode.parentNode) {
                    endPaperNode.parentNode.insert(endPaperNode.parentNode.children.indexOf(endPaperNode) + 1, clone(endPaperNode, {
                        text: endText.substring(endOffset),
                    }))
                }
                endPaperNode.setText(endText.substring(0, endOffset))
            }
        }

        pNodes.forEach((pNode: PaperNode) => pNode.mergeStyle(pStyle))

        let prevNode
        let currNode
        let nextNode
        let i

        // combine boundary point text nodes
        currNode = startPaperNode
        prevNode = currNode.prevNode
        if (prevNode && looseEqualTextNode(prevNode, currNode)) {
            startAnchor.setOffset(prevNode.text.length)
            if (pNodes.length === 1) {
                endAnchor.setOffset(prevNode.text.length + endOffset)
            }
            currNode.setText(prevNode.text + currNode.text)
            prevNode.remove()
        }
        currNode = endPaperNode
        nextNode = currNode.nextNode
        if (nextNode && looseEqualTextNode(currNode, nextNode)) {
            endAnchor.setOffset(currNode.text.length)
            currNode.setText(currNode.text + nextNode.text)
            nextNode.remove()
        }

        if (pNodes.length > 1) {
            // combine inner text nodes
            currNode = startPaperNode
            for (i = 1; i < pNodes.length - 1; i++) {
                nextNode = pNodes[i]
                if (looseEqualTextNode(currNode, nextNode)) {
                    currNode.setText(currNode.text + nextNode.text)
                    nextNode.remove()
                } else {
                    currNode = nextNode
                }
            }
            nextNode = endPaperNode
            if (looseEqualTextNode(currNode, nextNode)) {
                if (currNode !== startPaperNode) {
                    endAnchor.setOffset(currNode.text.length)
                    nextNode.setText(currNode.text + nextNode.text)
                    currNode.remove()
                } else {
                    currNode.setText(currNode.text + nextNode.text)
                    nextNode.remove()
                    endAnchor.setNode(startAnchor.node)
                    endAnchor.setOffset(currNode.text.length)
                }
            }
        }

        const parentNodeMap = new Map()
        pNodes.forEach((pNode: TextNode) => {
            parentNodeMap.set(pNode.parentNode, true)
        })
        for (const pNode of Array.from(parentNodeMap.keys())) {
            pNode.reLineWrap()
        }
    }
}
