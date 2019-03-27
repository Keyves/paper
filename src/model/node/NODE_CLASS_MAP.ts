import * as NodeClass from 'src/model/node'
import { NODE_TYPE } from 'src/lib/enum'
const {
    HEADING,
    HR,
    IMAGE,
    LINK,
    LIST_ITEM,
    LIST,
    PARAGRAPH,
    SPAN,
    TABLE,
} = NODE_TYPE

export interface INodeClassMap {
    [key: string ]: typeof NodeClass.PaperNode
}

/**
 * 节点类映射表
 * @param  {string} type [description]
 * @return {[type]}      [description]
 */
const NODE_CLASS_MAP = {
    [HEADING]: NodeClass.HeadingNode,
    [HR]: NodeClass.HrNode,
    [IMAGE]: NodeClass.ImageNode,
    [LINK]: NodeClass.LinkNode,
    [LIST_ITEM]: NodeClass.ListItemNode,
    [LIST]: NodeClass.ListNode,
    [PARAGRAPH]: NodeClass.ParagraphNode,
    [SPAN]: NodeClass.SpanNode,
    [TABLE]: NodeClass.TableNode,
} as INodeClassMap

export default NODE_CLASS_MAP

/**
 * 根据类型获取节点类（避免循环依赖导致引用丢失的情况）
 * @param  {string} type [节点类型]
 * @return {[type]}      [节点构造函数]
 */
export function getNodeClass(type: NODE_TYPE) {
    switch (type) {
    case HEADING:
        return NodeClass.HeadingNode
    case HR:
        return NodeClass.HrNode
    case IMAGE:
        return NodeClass.ImageNode
    case LINK:
        return NodeClass.LinkNode
    case LIST_ITEM:
        return NodeClass.ListItemNode
    case LIST:
        return NodeClass.ListNode
    case PARAGRAPH:
        return NodeClass.ParagraphNode
    case SPAN:
        return NodeClass.SpanNode
    case TABLE:
        return NodeClass.TableNode
    default:
        return NodeClass.UnknownNode
    }
}
