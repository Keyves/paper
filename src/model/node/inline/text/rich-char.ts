export default class RichChar {
    private _value: string
    private _width: number
    private _height: number

    constructor(options: any) {
        this._value = options.value
        this._width = options.width
        this._height = options.height
    }

    get value() {
        return this._value
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    setValue(value: string) {
        this._value = value
    }

    setWidth(width: number) {
        this._width = width
    }

    setHeight(height: number) {
        this._height = height
    }
}
