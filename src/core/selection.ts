import PaperMouseEvent from 'src/event/mouse'
import { caretRangeFromPoint } from 'src/util/dom'
import Anchor from 'src/core/anchor'
import PaperRange from 'src/core/range'
import EventEmitter from 'wolfy87-eventemitter'
import renderer from 'src/renderer'
import { TextNode } from 'src/model/node'

interface ISelectionOptions {
    el: HTMLElement
    inputEl: HTMLElement
}

export default class PaperSelection extends EventEmitter {
    readonly el: HTMLElement
    readonly inputEl: HTMLElement
    readonly ranges: PaperRange[] = []

    constructor(opts: ISelectionOptions) {
        super()
        this.el = opts.el
        this.inputEl = opts.inputEl
        this.initEvent()
    }

    private initEvent() {
        // const { ranges } = this
        // document.addEventListener('selectionchange', () => {
        //     const nativeRange = window.getSelection().getRangeAt(0)
        //     const { startContainer, startOffset, endContainer, endOffset } = nativeRange
        //     const startAnchor = new Anchor({
        //         node: startContainer,
        //         offset: startOffset,
        //     })
        //     const endAnchor = new Anchor({
        //         node: endContainer,
        //         offset: endOffset
        //     })
        //     let range: PaperRange
        //
        //     if (ranges.length) {
        //         range = ranges[ranges.length - 1]
        //         range.setStart(startAnchor)
        //         range.setEnd(endAnchor)
        //     } else {
        //         range = new PaperRange({
        //             startAnchor,
        //             endAnchor,
        //         })
        //         ranges.push(range)
        //     }
        // }, false)
        const { el, inputEl } = this

        inputEl.addEventListener('keydown', e => this._handleKeyboardEvent(e), false)
        el.addEventListener('click', () => {
            inputEl.focus()
        })
        el.addEventListener('mousedown', e => {
            this._handleMouseEvent(new PaperMouseEvent(e))
        }, false)
    }

    private _handleMouseEvent(ev: PaperMouseEvent) {
        const { el, ranges } = this
        const startX = ev.x
        const startY = ev.y
        const startNativeRange = caretRangeFromPoint(startX, startY)
        const { startContainer, startOffset } = startNativeRange
        const startAnchor = new Anchor({
            node: startContainer,
            offset: startOffset,
        })
        let range: PaperRange

        if (ranges.length) {
            range = ranges[ranges.length - 1]
            range.setStart(startAnchor)
            range.setEnd(startAnchor)
        } else {
            range = new PaperRange({
                startAnchor,
                endAnchor: startAnchor,
            })
            ranges.push(range)
        }

        this.trigger('change')

        const mousemove = (e: MouseEvent) => {
            const moveEv = new PaperMouseEvent(e)
            const moveNativeRange = caretRangeFromPoint(moveEv.x, moveEv.y)
            const moveContainer = moveNativeRange.startContainer
            const moveOffset = moveNativeRange.startOffset
            const endAnchor = new Anchor({
                node: moveContainer,
                offset: moveOffset,
            })
            const position = startContainer.compareDocumentPosition(moveContainer)

            if (position === Node.DOCUMENT_POSITION_PRECEDING || !position && startOffset > moveOffset) {
                range.setStart(endAnchor)
                range.setEnd(startAnchor)
                range.setDirection(PaperRange.BACKWARD)
            } else {
                range.setStart(startAnchor)
                range.setEnd(endAnchor)
                range.setDirection(PaperRange.FORWARD)
            }

            this.trigger('change')
        }

        const done = () => {
            el.removeEventListener('mousemove', mousemove, false)
            el.removeEventListener('mouseup', done, false)
        }

        el.addEventListener('mousemove', mousemove, false)
        el.addEventListener('mouseup', done, false)

        ev.preventDefault()
    }

    private _handleKeyboardEvent(ev: KeyboardEvent) {
        const key = ev.key
        switch (key) {
            // left
        case 'ArrowLeft':
            break
        // up
        case 'ArrowUp':
            this.ranges.forEach(range => {
                const startPaperNode = renderer.getPaperNode(range.startAnchor.node as Text) as TextNode
                const startLine = startPaperNode.lineNode!
                const prevStartLine = startLine.prevNode
                let currLineOffsetLeft = 0
                let prevLineOffsetLeft = 0
                for (const child of startLine.children) {
                    if (child !== startPaperNode) {
                        child.getRichChars().forEach(richChar => {
                            currLineOffsetLeft += richChar.width
                        })
                    } else {
                        break
                    }
                }
                startPaperNode.getRichChars().slice(0, range.startAnchor.offset).forEach(richChar => {
                    currLineOffsetLeft += richChar.width
                })
                if (prevStartLine) {
                    for (const child of prevStartLine.children) {
                        for (const richChar of child.getRichChars()) {
                            prevLineOffsetLeft += richChar.width
                            if (prevLineOffsetLeft > currLineOffsetLeft) {
                                console.log(richChar)
                            }
                        }
                    }
                }
            })
            break
        // right
        case 'ArrowRight':
            break
        // down
        case 'ArrowDown':
            break
        }
    }

}
