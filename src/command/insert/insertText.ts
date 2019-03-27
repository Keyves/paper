import PaperRange from 'src/core/range'
import { TextNode } from 'src/model/node'

export default function insertText(range: PaperRange, text: string) {
    const storeRange = range.toStoreRange()
    const startAnchor = range.startAnchor
    const endAnchor = range.endAnchor
    const from = storeRange.start.path
    const offset = startAnchor.offset
    let currNode

    currNode = this.document.find(from)
    if (currNode && currNode instanceof TextNode) {
        currNode.setText(currNode.text.substring(0, offset) + text + currNode.text.substring(offset))
        startAnchor.setOffset(offset + text.length)
        endAnchor.setOffset(offset + text.length)
        if (currNode.parentNode) {
            currNode.parentNode.lineWrap()
        }
    }
}
