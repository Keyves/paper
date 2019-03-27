import Vue from 'vue'
import store from './store'
import EventEmitter from 'wolfy87-eventemitter'
import PaperRange from 'src/core/range'
import PaperSelection from 'src/core/selection'
import PaperNode from 'src/model/node/abstract/base'
import { DocumentNode } from 'src/model/node'
import Editor from 'src/view/editor'
import { duplicateRectFilter } from 'src/util/dom'
import * as Commands from 'src/command'
import logger from 'src/lib/logger'
import { IJSONObject } from 'src/@types/global'
import { ICompNodeProps } from 'src/model/node/abstract/comp'

interface IPaperOptions {
    content: any,
    selector?: string,
    el?: HTMLElement
}

export default class Paper extends EventEmitter {
    vm: Editor
    toolbarVm: Vue
    contentEl: HTMLElement
    inputEl: HTMLElement
    selection: PaperSelection
    document: PaperNode

    constructor(opts: IPaperOptions) {
        super()
        const vm = new Editor({ propsData: store }).$mount(opts.selector)
        const contentEl = vm.$refs.content as HTMLElement

        // contentEl.innerHTML = opts.content

        this.vm = vm
        this.toolbarVm = vm.$refs.toolbar as any
        this.inputEl = vm.$refs.input as HTMLElement
        this.contentEl = contentEl
        this.selection = new PaperSelection({
            el: contentEl,
            inputEl: this.inputEl,
        })
        this.document = this.setContent(opts.content)
        this._syncStore()
        this.bindCommands()
    }

    private _syncStore() {
        const { selection, contentEl } = this
        const storeSelection = store.selection

        selection.on('change', () => {
            const contentRect = contentEl.getBoundingClientRect()
            const rootLeft = contentRect.left
            const rootTop = contentRect.top
            const backgrounds: any = []
            const carets: any = []
            selection.ranges.forEach(range => {
                const rects = range.toNativeRange().getClientRects()
                let caretRect

                duplicateRectFilter(rects)
                    .forEach(rect => {
                        backgrounds.push({
                            width: rect.width + 'px',
                            height: rect.height + 'px',
                            left: rect.left - rootLeft + 'px',
                            top: rect.top - rootTop + 'px',
                        })
                    })

                if (range.direction === PaperRange.BACKWARD) {
                    caretRect = rects[0]
                    carets.push({
                        height: caretRect.height + 'px',
                        left: caretRect.left - rootLeft + 'px',
                        top: caretRect.top - rootTop + 'px',
                    })
                } else {
                    caretRect = rects[rects.length - 1]
                    carets.push({
                        height: caretRect.height + 'px',
                        left: caretRect.right - rootLeft + 'px',
                        top: caretRect.top - rootTop + 'px',
                    })
                }
            })
            storeSelection.backgrounds = backgrounds
            storeSelection.carets = carets
        })
    }

    setContent(content: IJSONObject) {
        this.document = Object.assign(store.document, new DocumentNode(content as ICompNodeProps))
        logger.error(this.document)
        return this.document
    }

    execCommand(name: string, ...params: any[]) {
        return (Commands as any)[name].apply(this, params)
    }

    bindCommands() {
        const ranges = this.selection.ranges
        this.toolbarVm.$on('execCommand', (name: string, ...args: any[]) => {
            ranges.forEach(range => {
                this.execCommand(name, range, ...args)
                Vue.nextTick(() => this.selection.trigger('change') && !logger.error(this.selection))
            })
        })
        this.vm.$on('execCommand', (name: string, ...args: any[]) => {
            ranges.forEach(range => {
                this.execCommand(name, range, ...args)
                Vue.nextTick(() => this.selection.trigger('change') && !logger.error(this.selection))
            })
        })
    }
}
