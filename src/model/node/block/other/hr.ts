import BlockNode from 'src/model/node/abstract/block'
import { NODE_TYPE } from 'src/lib/enum'

export default class HrNode extends BlockNode {
    type = NODE_TYPE.HR
}
