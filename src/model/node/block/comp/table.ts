import CompNode from 'src/model/node/abstract/comp'
import { NODE_TYPE } from 'src/lib/enum'

export default class TableNode extends CompNode {
    type = NODE_TYPE.TABLE
}
