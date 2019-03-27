export default class PaperMouseEvent {
    readonly originalEvent: MouseEvent

    readonly button: number
    readonly target: HTMLElement
    detail: number
    readonly x: number
    readonly y: number
    readonly ctrlKey: boolean
    readonly shiftKey: boolean
    readonly altKey: boolean
    readonly metaKey: boolean

    constructor(e: MouseEvent) {
        this.originalEvent = e
        this.button = e.button
        this.target = e.target as HTMLElement

        this.detail = e.type === 'dblclick' ? 2 : (e.detail || 1)

        this.ctrlKey = e.ctrlKey
        this.shiftKey = e.shiftKey
        this.altKey = e.altKey
        this.metaKey = e.metaKey

        this.x = e.clientX
        this.y = e.clientY
    }

    preventDefault() {
        this.originalEvent.preventDefault()
    }

    stopPropagation() {
        this.originalEvent.stopPropagation()
    }
}
