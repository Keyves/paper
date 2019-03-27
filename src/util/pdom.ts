import { shallowEqual } from 'src/util/lang'
import PaperNode from 'src/model/node/abstract/base'
import PaperTextNode from 'src/model/node/abstract/text'
import PaperCompNode from 'src/model/node/abstract/comp'
import PaperInlineNode from 'src/model/node/abstract/inline'

/**
 * 判断节点是否条件(type, pStyle)相等
 */
export function looseEqualTextNode(a: PaperNode, b: PaperNode): boolean {
    return (
        a instanceof PaperTextNode
        && b instanceof PaperTextNode
        && a.parentNode === b.parentNode
        && a.type === b.type
        && shallowEqual(a.style, b.style)
    )
}

export function looseEqualPaperNode(a: PaperNode, b: PaperNode): boolean {
    return (
        a instanceof PaperNode
        && b instanceof PaperNode
        && a.parentNode === b.parentNode
        && a.type === b.type
        && shallowEqual(a.style, b.style)
    )
}

export function combineInlineNode(a: PaperNode, b: PaperNode): boolean | undefined {
    if (looseEqualPaperNode(a, b)) {
        if (a instanceof PaperTextNode && b instanceof PaperTextNode) {
            a.setText(a.text + b.text)
        }
        return true
    }
}

export function findPrevInlineNode(currNode: PaperInlineNode): PaperInlineNode | undefined {
    let prevNode
    let parentNode

    prevNode = currNode.prevNode
    if (prevNode) {
        return prevNode
    } else {
        parentNode = currNode.parentNode
        if (parentNode) {
            prevNode = parentNode.prevNode
            while (prevNode instanceof PaperCompNode) {
                prevNode = prevNode.children[prevNode.children.length - 1]
            }
        }
        if (prevNode instanceof PaperInlineNode) {
            return prevNode
        }
    }
}
