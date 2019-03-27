import PaperNode, { IPaperNodeProps } from 'src/model/node/abstract/base'
import BlockNode from 'src/model/node/abstract/block'
import { getNodeClass } from 'src/model/node/NODE_CLASS_MAP'
import InlineNode from 'src/model/node/abstract/inline'
import { IJSONObject } from 'src/@types/global'

export interface ICompNodeProps extends IPaperNodeProps {
    level?: number
    children?: IJSONObject[]
}

export default abstract class CompNode extends BlockNode {
    readonly children: PaperNode[] = []
    level: number

    constructor(data: ICompNodeProps) {
        super(data)

        if (typeof data.level === 'number') {
            this.level = data.level
            this._convert(data)
        } else {
            this.level = 0
            this._convert({
                ...data,
                level: this.level,
            })
        }
    }

    private _convert(root: ICompNodeProps) {
        const children = root.children
        if (!children) {
            return
        }
        // tslint:disable-next-line variable-name
        let PaperNodeClass: any
        let pChild: PaperNode
        let child

        for (child of children) {
            PaperNodeClass = getNodeClass(child.type)
            pChild = new PaperNodeClass({
                ...child,
                level: root.level! + 1,
            })
            this.append(pChild)
        }
        return this
    }

    protected _parsePath(from?: number[], to?: number[]) {
        return {
            start: from ? from[this.level] : 0,
            end: to ? to[this.level] : this.children.length - 1,
        }
    }

    find(path: number[]): PaperNode | null {
        let i
        let len
        let node: CompNode = this
        let child: PaperNode | null = null
        for (i = 0, len = path.length - 1; i < len; i++) {
            child = node.children[path[i]]
            if (!child) {
                return null
            }
            if (child instanceof CompNode) {
                node = child
            }
        }
        return child
    }

    replace(index: number, len: number, pNodes: PaperNode[]) {
        const prevChild = this.children[index - 1]
        const nextChild = this.children[index + len]
        const newLen = pNodes && pNodes.length
        let tempNode

        if (newLen) {
            if (prevChild) {
                tempNode = pNodes[0]
                tempNode.setParentNode(this)
                tempNode.setPrevNode(prevChild)
                prevChild.setNextNode(tempNode)
            }
            if (nextChild) {
                tempNode = pNodes[pNodes.length - 1]
                tempNode.setParentNode(this)
                tempNode.setNextNode(nextChild)
                nextChild.setPrevNode(tempNode)
            }
            if (newLen > 1) {
                let i
                let currNode
                let nextNode
                for (i = 0; i < pNodes.length - 1; i++) {
                    currNode = pNodes[i]
                    nextNode = pNodes[i + 1]
                    currNode.setParentNode(this)
                    currNode.setNextNode(nextNode)
                    nextNode.setPrevNode(currNode)
                }
            } else {
                pNodes[0].setParentNode(this)
            }
        } else {
            prevChild && prevChild.setNextNode(nextChild)
            nextChild && nextChild.setPrevNode(prevChild)
        }

        this.children.splice(index, len, ...pNodes)
    }

    insert(index: number, pChild: PaperNode) {
        const prevChild = this.children[index - 1]
        const nextChild = this.children[index]
        if (prevChild) {
            pChild.setPrevNode(prevChild)
            prevChild.setNextNode(pChild)
        }
        if (nextChild) {
            pChild.setNextNode(nextChild)
            nextChild.setPrevNode(pChild)
        }
        pChild.setParentNode(this)
        this.children.splice(index, 0, pChild)
    }

    append(pChild: PaperNode) {
        const lastChild = this.children[this.children.length - 1]
        if (lastChild) {
            lastChild.setNextNode(pChild)
            pChild.setPrevNode(lastChild)
        }
        pChild.setParentNode(this)
        this.children.push(pChild)
    }

    delete(pChild: PaperNode) {
        const prevChild = pChild.prevNode
        const nextChild = pChild.nextNode
        if (prevChild) {
            prevChild.setNextNode(nextChild)
        }
        if (nextChild) {
            nextChild.setPrevNode(prevChild)
        }
        this.children.splice(this.children.indexOf(pChild), 1)
    }

    getInterNodes(from?: number[], to?: number[]) {
        const { start, end } = this._parsePath(from, to)
        const len = end - start + 1
        let pNodes: InlineNode[] = []
        let i: number

        const push = function(pNode: PaperNode, _from?: number[], _to?: number[]) {
            if (pNode instanceof CompNode) {
                pNodes = pNodes.concat(pNode.getInterNodes(_from, _to))
            } else if (pNode instanceof InlineNode) {
                pNodes.push(pNode)
            }
        }

        if (len > 0) {
            if (len === 1) {
                push(this.children[start], from, to)
            } else {
                push(this.children[start], from, undefined)
                for (i = start + 1; i < end; i++) {
                    push(this.children[i])
                }
                push(this.children[end], undefined, to)
            }
        }

        return pNodes
    }

    deleteContent(from?: number[], to?: number[]) {
        const result = this._parsePath(from, to)
        let start = result.start
        const end = result.end
        let len = end - start + 1
        let deleteAll = false
        let deleteStart: boolean
        let deleteEnd: boolean
        let startNode: PaperNode
        let endNode: PaperNode

        if (len > 0) {
            if (len === 1) {
                deleteAll = this.children[start].deleteContent(from, to)
            } else {
                startNode = this.children[start]
                endNode = this.children[end]
                deleteStart = startNode.deleteContent(from, undefined)
                deleteEnd = endNode.deleteContent(undefined, to)
                deleteAll = start === 0 && end === this.children.length && deleteStart && deleteEnd
                if (!deleteAll) {
                    if (deleteStart) {
                        start--
                    }
                    if (deleteEnd) {
                        len++
                    }
                    this.children.splice(start + 1, len - 2)
                }
            }
        }
        if (deleteAll) {
            this.children.splice(0, this.children.length)
        }
        return deleteAll
    }
}
