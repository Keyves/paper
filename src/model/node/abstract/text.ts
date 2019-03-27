import InlineNode from 'src/model/node/abstract/inline'
import renderer from 'src/renderer'
import RichChar from 'src/model/node/inline/text/rich-char'

function parseTextToRichChar(text: string, style: any) {
    const chars = []
    let i
    let len
    let char

    renderer.setCaliperStyle(style)

    for (i = 0, len = text.length; i < len; i++) {
        char = text.charAt(i)
        chars.push(new RichChar({
            value: char,
            ...renderer.measure(char),
        }))
    }
    return chars
}

function convertRichCharsToText(richChars: RichChar[]) {
    return richChars.map((v: RichChar) => v.value).join('')
}

export default abstract class TextNode extends InlineNode {
    private _richChars: RichChar[] = []

    constructor(opts: any) {
        super(opts)
        if (opts.richChars) {
            this._richChars = opts.richChars
        } else if (opts.text) {
            this.setText(opts.text)
        }
    }

    get text() {
        return convertRichCharsToText(this._richChars)
    }

    get size() {
        return this._richChars.length
    }

    appendText(text: string | RichChar[]) {
        if (typeof text === 'string') {
            this._richChars = this._richChars.concat(parseTextToRichChar(text, this.style))
        } else {
            this._richChars = this._richChars.concat(text)
        }
    }

    clone() {
        return new (this as any).constructor({
            richChars: this._richChars,
            style: this.style,
        })
    }

    deleteText(start: number, len?: number) {
        if (len === undefined) {
            return this._richChars.splice(start)
        } else {
            return this._richChars.splice(start, len)
        }
    }

    getRichChars() {
        return this._richChars
    }

    insertText(text: string | RichChar[], index: number) {
        if (typeof text === 'string') {
            this._richChars.splice(index, 0, ...parseTextToRichChar(text, this.style))
        } else {
            this._richChars.splice(index, 0, ...text)
        }
    }

    resetRichChars() {
        this._richChars = parseTextToRichChar(this.text, this.style)
    }

    setText(text: string | RichChar[]) {
        if (typeof text === 'string') {
            this._richChars = parseTextToRichChar(text, this.style)
        } else {
            this._richChars = text
        }
    }
}
