interface IAnchorOptions {
    node: Node
    offset: number
}

export default class Anchor {
    node: Node
    offset: number

    constructor(opts: IAnchorOptions) {
        this.node = opts.node
        this.offset = opts.offset
    }

    equal(anchor: Anchor) {
        return this.node === anchor.node && this.offset === anchor.offset
    }

    setOffset(offset: number) {
        this.offset = offset
    }

    setNode(node: Node) {
        this.node = node
    }
}

// export function getFullRectFromTextNode(node: Text) {
//     return createNativeRange(node, 0, node, node.nodeValue.length).getBoundingClientRect()
// }

// export function getFullRectFromNode(node: Node) {
//     if (node.nodeType === node.ELEMENT_NODE) {
//         return (<HTMLElement>node).getBoundingClientRect()
//     } else if (node.nodeType === node.TEXT_NODE) {
//         return getFullRectFromTextNode(<Text>node)
//     }
// }

// export function getAnchorFromTextNode(node: Text, x: number, y: number): Anchor {
//     let charWidth, len, rect, charRect, line, offset, caret

//     offset = 0
//     len = node.nodeValue.length

//     if (len) {
//         rect = createNativeRange(node, 0, node, len).getBoundingClientRect()
//         charRect = createNativeRange(node, 0, node, 1).getBoundingClientRect()
//         charWidth = charRect.width
//         // 当文本节点存在换行情况时，计算坐标对应的行数，再根据行数映射字符偏移量
//         line = Math.floor((y - rect.top) / charRect.height)
//         line = line > 0 ? line : 0
//         offset = Math.floor((x - rect.left) / charWidth + (line * rect.width / charWidth))
//         offset = offset > 0 ? offset : 0

//         // TODO it has infinite loop bug
//         for (; ; ) {
//             if (offset >= len) {
//                 offset = len
//                 rect = createNativeRange(node, offset, node, offset).getBoundingClientRect()
//                 if (y >= rect.top && y <= rect.bottom) {
//                     if (x >= rect.right) {
//                         caret = new Caret(rect.right, rect.top, rect.height)
//                         break
//                     } else {
//                         offset--
//                     }
//                 } else if (y < rect.top) {
//                     offset--
//                 } else {
//                     offset++
//                 }
//             } else if (offset < 0) {
//                 offset = 0
//                 rect = createNativeRange(node, offset, node, offset).getBoundingClientRect()
//                 if (y >= rect.top && y <= rect.bottom) {
//                     if (x <= rect.left) {
//                         break
//                     }
//                 } else if (y < rect.top) {
//                     offset--
//                 } else {
//                     offset++
//                 }
//             } else {
//                 // 计算坐标是否处于当前偏移字符的rect内，否则根据差值除以字符宽度计算相差的偏移量
//                 rect = createNativeRange(node, offset, node, offset + 1).getBoundingClientRect()
//                 if (y >= rect.top && y <= rect.bottom) {
//                     if (x >= rect.left && x <= rect.right) {
//                         if (x >= rect.left + rect.width / 2) {
//                             offset++
//                             rect = createNativeRange(node, offset, node, offset).getBoundingClientRect()
//                         }
//                         break
//                     } else if (x < rect.left) {
//                         offset--
//                     } else {
//                         offset++
//                     }
//                 } else if (y < rect.top) {
//                     offset--
//                 } else {
//                     offset++
//                 }
//             }
//         }
//     }
//     return new Anchor(node, offset, caret || new Caret(rect.left, rect.top, rect.height))
// }

// export function getAnchorFromElement(el: HTMLElement, x: number, y: number): Anchor {
//     const childNodes = el.childNodes
//     const len = childNodes.length
//     let i, node, rect

//     if (len > 1) {
//         // 判断是否在首尾节点之外
//         node = el.firstChild
//         rect = getFullRectFromNode(node)
//         if (x < rect.left) {
//             node = node.firstChild
//             while (node && node.firstChild) {
//                 node = node.firstChild
//             }
//             return new Anchor(node, 0, new Caret(rect.left, rect.top, rect.height))
//         }

//         node = el.lastChild
//         rect = getFullRectFromNode(node)
//         if (x > rect.right) {
//             node = node.lastChild
//             while (node && node.lastChild) {
//                 node = node.lastChild
//             }
//             return new Anchor(node, node.nodeValue ? node.nodeValue.length : 0, new Caret(rect.right, rect.top, rect.height))
//         }

//         // 判断是否在内部节点中
//         for (i = 0; i < len; i++) {
//             node = childNodes[i]
//             if (node.nodeType === node.ELEMENT_NODE) {
//                 rect = (<HTMLElement>node).getBoundingClientRect()
//                 if (x >= rect.left && x <= rect.right) {
//                     return getAnchorFromElement(<HTMLElement>node, x, y)
//                 }
//             } else if (node.nodeType === node.TEXT_NODE) {
//                 rect = getFullRectFromTextNode(<Text>node)
//                 if (x >= rect.left && x <= rect.right) {
//                     return getAnchorFromTextNode(<Text>node, x, y)
//                 }
//             }
//         }
//     } else if (len === 1) {
//         node = childNodes[0]
//         if (node.nodeType === node.TEXT_NODE) {
//             return getAnchorFromTextNode(<Text>node, x, y)
//         } else if (node.nodeType === node.ELEMENT_NODE) {
//             return getAnchorFromElement(<HTMLElement>node, x, y)
//         }
//     }

//     rect = el.getBoundingClientRect()

//     return new Anchor(node, 0, new Caret(rect.left, rect.top, rect.height))
// }
