import ParagraphNode from 'src/model/node/block/comp/paragraph'
import { NODE_TYPE } from 'src/lib/enum'

export default class HeadingNode extends ParagraphNode {
    type = NODE_TYPE.HEADING
}
