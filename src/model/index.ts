// import PaperNode from './node/abstract/base'
// import { DocumentNode, UnknownNode } from './node'
// import NODE_CLASS_MAP from './NODE_CLASS_MAP'

/*
export function convert(root: any, pRoot: PaperNode = new DocumentNode(root)): PaperNode {
    const children = root.children
    let PaperNodeClass: any,
        pChild: PaperNode,
        child

    for (child of children) {
        PaperNodeClass = NODE_CLASS_MAP[child.type]
        pChild = PaperNodeClass ? new PaperNodeClass(child) : new UnknownNode(child)
        pRoot.append(pChild)
    }
    return pRoot
}

// const ELEMENT_TYPE = 1
// const TEXT_TYPE = 3

export function parseHTML(root: HTMLElement) {
    const pRoot = new PaperNode(root)
    parseHTML_DFS(root, pRoot)
    console.log(pRoot)
}

export function parseHTML_DFS(node: HTMLElement, pNode: PaperNode) {
    let child = <HTMLElement>node.firstChild,
        PaperNodeClass: any,
        pChild: PaperNode,
        text: string

    while (child) {
        if (child.nodeType === child.ELEMENT_NODE) {
            PaperNodeClass = NODE_CLASS_MAP[child.tagName.toLowerCase()]
            if (PaperNodeClass) {
                pChild = new PaperNodeClass(child)
                pNode.children.push(pChild)
                convertDFS(child, pChild)
            }
        } else if (child.nodeType === child.TEXT_NODE) {
            text = child.textContent
            pNode.text += text
        }
        child = <HTMLElement>child.nextSibling
    }
}

// loop recurse
export function convertDFSToPaperNode(node: any, pNode: PaperNode) {
    const children = any[](node.children)
    let PaperNodeClass: any,
        pChild: PaperNode,
        child

    for (child of children) {
        PaperNodeClass = NODE_CLASS_MAP[child.type]
        pChild = new PaperNodeClass(child)
        pNode.append(pChild)
        convertDFSToPaperNode(child, pChild)
    }
}
*/
