import { IPaperStyle } from 'src/model/node'

export default class Caliper {
    private _containerNode: HTMLSpanElement
    private _textNode: Text

    // backup pre style, which used to reset before set curr style
    private _preStyle: IPaperStyle = {}

    constructor() {
        const div = document.createElement('div')
        const span = this._containerNode = document.createElement('span')
        const textNode = this._textNode = document.createTextNode('')

        Object.assign(div.style, {
            position: 'absolute',
            visibility: 'hidden',
            fontSize: '24px',
            opacity: '0',
            whiteSpace: 'pre',
        })

        span.appendChild(textNode)
        div.appendChild(span)
        document.body.appendChild(div)
    }

    measure(value: string) {
        const { _textNode, _containerNode } = this
        _textNode.nodeValue = value

        return {
            width: _containerNode.offsetWidth,
            height: _containerNode.offsetHeight,
        }
    }

    resetStyle() {
        const { _preStyle, _containerNode } = this

        Object.keys(_preStyle).forEach((key: string) => {
            (_containerNode.style as any)[key] = ''
        })
    }

    setStyle(style: IPaperStyle) {
        this.resetStyle()
        Object.assign(this._containerNode.style, style)
        this._preStyle = style
    }
}
