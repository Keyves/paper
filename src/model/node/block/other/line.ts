import { NODE_TYPE } from 'src/lib/enum'
import TextNode from 'src/model/node/abstract/text'
import BlockNode from 'src/model/node/abstract/block'
import { IPaperNodeProps } from 'src/model/node/abstract/base'

interface ILineNodeProps extends IPaperNodeProps {
    width: number
    height: number
}

export default class LineNode extends BlockNode {
    readonly children: TextNode[] = []
    type = NODE_TYPE.LINE

    width: number
    height: number

    constructor(props: ILineNodeProps) {
        super(props)
        this.width = props.width
        this.height = props.height
    }

    add(pNode: TextNode) {
        this.children.push(pNode)
        pNode.setLineNode(this)
    }
}
