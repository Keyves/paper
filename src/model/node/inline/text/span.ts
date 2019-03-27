import TextNode from 'src/model/node/abstract/text'
import { NODE_TYPE } from 'src/lib/enum'

export default class SpanNode extends TextNode {
    type = NODE_TYPE.SPAN
}
