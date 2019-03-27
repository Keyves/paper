import { PaperNode, CompNode } from 'src/model/node'
import { ICompNodeProps } from 'src/model/node/abstract/comp'
import NODE_CLASS_MAP from 'src/model/node/NODE_CLASS_MAP'

export default {
    convertDataToModel(data: ICompNodeProps) {
        if (!data.level) {
            data = Object.assign({
                level: 1,
            }, data)
        }
        // tslint:disable-next-line variable-name
        let PaperNodeClass: any
        let pNode: PaperNode
        let childData
        PaperNodeClass = NODE_CLASS_MAP[data.type!]
        pNode = new PaperNodeClass(data)
        if (pNode instanceof CompNode && data.children) {
            for (childData of data.children) {
                pNode.append(this.convertDataToModel({
                    ...childData,
                    level: data.level! + 1,
                }))
            }
        }
        return pNode
    },
}
