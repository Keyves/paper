import InlineNode from 'src/model/node/abstract/inline'
import { NODE_TYPE } from 'src/lib/enum'

export default class ImageNode extends InlineNode {
    type = NODE_TYPE.IMAGE
}
