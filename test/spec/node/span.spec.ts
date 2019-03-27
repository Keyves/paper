import { SpanNode } from 'src/model/node'
import spanData from 'example/mock/span.data'

function convertRichCharsToText(richChars: any[]) {
    return richChars.map((v: any) => v.value).join('')
}

describe('pdom', () => {
    const spanNode = new SpanNode(spanData)

    it('constructor', () => {
        expect(spanNode.text).toEqual(spanData.text)
        expect(convertRichCharsToText(spanNode.getRichChars())).toEqual(spanData.text)
        const newNode = new SpanNode({
            richChars: spanNode.getRichChars()
        })
        ; (newNode as any).id = spanNode.id
        expect(newNode).toEqual(spanNode)
    })

    it('size',  () => {
        expect(spanNode.size).toEqual(spanData.text.length)
    })

    it('clone', () => {
        const cloneNode = spanNode.clone()
        ; (cloneNode as any).id = spanNode.id
        expect(cloneNode).toEqual(spanNode)
    })

    it('appendText', () => {
        const newNode = new SpanNode(spanData)
        const newText = 'abc'
        newNode.appendText(newText)
        expect(newNode.text).toEqual(spanData.text + newText)
    })
})
