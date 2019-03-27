import PaperCompNode from 'src/model/node/abstract/comp'
import { NODE_TYPE } from 'src/lib/enum'

export interface IPaperStyle {
    fontWeight?: 'bold' | 'normal' | string
    fontStyle?: 'italic' | 'normal' | string
    color?: string
    verticalAlign?: 'top' | 'bottom' | 'middle'
    horizialAlign?: 'left' | 'right' | 'center'
    textDecoration?: 'underline' | 'line-through' | string
    display?: string
    lineHeight?: number | string
}

export interface IPaperNodeProps {
    type?: NODE_TYPE
    style?: IPaperStyle
}

let id = 0

export default abstract class PaperNode {
    abstract readonly type: NODE_TYPE

    readonly id: number

    prevNode: this | null = null
    nextNode: this | null = null
    parentNode: PaperCompNode | null = null
    style: IPaperStyle = {}

    constructor(props: IPaperNodeProps) {
        this.id = id++
        this.mergeStyle(props.style)
    }

    abstract deleteContent(from?: number[], to?: number[]): boolean

    mergeStyle(props: IPaperStyle | undefined) {
        this.style = Object.assign({}, this.style, props)
    }

    setPrevNode(pNode: this | null) {
        this.prevNode = pNode
    }

    setNextNode(pNode: this | null) {
        this.nextNode = pNode
    }

    setParentNode(pNode: PaperCompNode | null) {
        this.parentNode = pNode
    }

    remove() {
        if (this.parentNode) {
            this.parentNode.delete(this)
        }
    }
}
