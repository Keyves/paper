import { CompNode, TextNode, RichChar, LineNode } from 'src/model/node'
import { clone } from 'src/util/lang'
import { NODE_TYPE } from 'src/lib/enum'

export default class ParagraphNode extends CompNode {
    readonly children: TextNode[]
    type = NODE_TYPE.PARAGRAPH

    private _lines: LineNode[] = []

    constructor(data: any) {
        super(data)
        this.lineWrap()
    }

    get lines() {
        return this._lines
    }

    reLineWrap() {
        this._combineLines()
        this.lineWrap()
    }

    lineWrap() {
        const maxWidth = 750
        const lines: LineNode[] = []
        let lineChildren: TextNode[] = []
        let prevLineNode: LineNode | null = null
        let lineWidth = 0
        let lineHeight = 0
        let wordWidth = 0
        let richChars: RichChar[]
        let richChar: RichChar
        let wordLen = 0
        let iLen: number
        let jLen: number
        let i: number
        let j: number
        let childNode: TextNode
        let wrapped = false

        for (i = 0, iLen = this.children.length; i < iLen; i++) {
            childNode = this.children[i]
            richChars = childNode.getRichChars()
            wrapped = false

            for (j = 0, jLen = richChars.length; j < jLen; j++) {
                richChar = richChars[j]
                wordWidth += richChar.width
                wordLen++
                if (/\s/.test(richChar.value)) {
                    lineWidth += wordWidth
                    if (lineWidth < maxWidth) {
                        wordWidth = 0
                        wordLen = 0
                    }
                }
                if (lineWidth > maxWidth) {
                    const currLineNode = new LineNode({
                        width: lineWidth - wordWidth,
                        height: lineHeight,
                    })
                    currLineNode.setParentNode(this)
                    currLineNode.setPrevNode(prevLineNode)
                    prevLineNode && prevLineNode.setNextNode(currLineNode)
                    lineChildren.forEach(lineChild => currLineNode.add(lineChild))
                    lines.push(currLineNode)
                    wordWidth = 0
                    lineWidth = 0
                    lineHeight = 0
                    // separate text node
                    if (j - wordLen < jLen) {
                        currLineNode.add(childNode)
                        const cloneNode = clone(childNode)
                        cloneNode.setText(childNode.deleteText(j - wordLen))
                        this.insert(i + 1, cloneNode)
                        iLen++
                        wrapped = true
                        wordLen = 0
                        lineChildren = []
                        prevLineNode = currLineNode
                        break
                    } else {
                        wordLen = 0
                        lineChildren = []
                        prevLineNode = currLineNode
                    }
                } else {
                    lineHeight = Math.max(lineHeight, richChar.height)
                }
            }

            if (!wrapped) {
                lineChildren.push(childNode)
            }
        }

        if (lineChildren.length) {
            const currLineNode = new LineNode({
                width: lineWidth - wordWidth,
                height: lineHeight,
            })
            currLineNode.setParentNode(this)
            currLineNode.setPrevNode(prevLineNode)
            prevLineNode && prevLineNode.setNextNode(currLineNode)
            lineChildren.forEach(lineChild => currLineNode.add(lineChild))
            lines.push(currLineNode)
        }
        this._lines = lines
    }

    private _combineLines() {
        const lines = this._lines
        let pNodes: TextNode[]
        let lastNode: TextNode
        let lineChildren: TextNode[]
        let currLineFirstNode: TextNode
        let i: number
        let j: number

        pNodes = lines[0].children
        lastNode = pNodes[pNodes.length - 1]

        for (i = 1; i < lines.length; i++) {
            lineChildren = lines[i].children
            currLineFirstNode = lineChildren[0]
            lastNode.setText(lastNode.text + currLineFirstNode.text)
            for (j = 1; j < lineChildren.length; j++) {
                pNodes.push(lineChildren[j])
            }
            lastNode = pNodes[pNodes.length - 1]
        }

        this.replace(0, this.children.length, pNodes)
    }
}
