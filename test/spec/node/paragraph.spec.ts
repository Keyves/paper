import ParagraphData from 'example/mock/paragraph.data'
import { ParagraphNode, TextNode } from 'src/model/node'
import * as _ from 'lodash'

function equalTextNode(a: TextNode, b: TextNode) {
    try {
        expect(a.type).toEqual(b.type)
        expect(a.style).toEqual(b.style)
        expect(a.text).toEqual(b.text)
        expect(a.getRichChars()).toEqual(b.getRichChars())
    } catch (e) {
        throw e
    }
    return true
}

function equalList(a: any[], b: any[], cb: Function) {
    return a.every((v: any, i: number) => cb(v, b[i])) && a.length === b.length
}

describe('paragraph', () => {
    let paraNode: ParagraphNode

    beforeEach(() => {
        paraNode = new ParagraphNode(ParagraphData)
    })

    it('relineWrap', () => {
        const newNode = _.cloneDeep(paraNode)
        paraNode.reLineWrap()
        expect(
            equalList(newNode.children, paraNode.children, (a: any, b: any) =>
                equalTextNode(a, b)
            )
        ).toBeTruthy
        expect(
            equalList(newNode.lines, paraNode.lines, (al: any, bl: any) =>
                equalList(al.children, bl.children, (a: any, b: any) =>
                    equalTextNode(a, b)
                )
            )
        ).toBeTruthy
    })
})
