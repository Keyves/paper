import CompNode from 'src/model/node/abstract/comp'
import { NODE_TYPE } from 'src/lib/enum'

export default class DocumentNode extends CompNode {
    type = NODE_TYPE.DOCUMENT
}
