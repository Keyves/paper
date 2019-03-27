import ParagraphNode from 'src/model/node/block/comp/paragraph'
import { NODE_TYPE } from 'src/lib/enum'

export default class ListItemNode extends ParagraphNode {
    type = NODE_TYPE.LIST_ITEM
}
