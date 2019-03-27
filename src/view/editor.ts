import './directive'
import './editor.scss'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import PaperToolbar from './toolbar'
import { PaperParagraph, PaperTable, PaperList } from './component'
import Colorful from 'colorful-ui'
import 'colorful-ui/dist/colorful-ui.min.css'

Vue.use((Colorful as any))

@Component({
    components: { PaperToolbar, PaperParagraph, PaperTable, PaperList },
    template: `
        <div class="paper-editor" :class="classes" :style="{flex: 1}">
            <paper-toolbar ref="toolbar"></paper-toolbar>
            <div class="paper-edit-area">
                <span class="paper-measure"></span>
                <div class="paper-selection" ref="selection">
                    <div class="paper-selection-background">
                        <div
                            class="paper-selection-rect"
                            v-for="background in selection.backgrounds"
                            :style="{
                                left: background.left,
                                top: background.top,
                                width: background.width,
                                height: background.height
                            }"
                            >
                        </div>
                    </div>
                    <div class="paper-selection-caret-textarea">
                        <textarea
                            ref="input"
                            class="paper-selection-caret-textarea--inner"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            tabindex="0"
                            :style="{
                                left: lastCaret.left,
                                top: lastCaret.top,
                                height: lastCaret.height
                            }"
                            @keydown="onKeydown"
                            @input="onInput"
                            >
                        </textarea>
                    </div>
                    <div class="paper-selection-carets">
                        <div
                            class="paper-selection-caret"
                            v-for="caret in selection.carets"
                            :style="{
                                left: caret.left,
                                top: caret.top,
                                height: caret.height
                            }"
                            >
                        </div>
                    </div>
                </div>
                <div class="paper-content" ref="content">
                    <template v-for="(node, index) in document.children">
                        <paper-paragraph v-if="node.type === 'paragraph'" :pNode="node"/>
                        <paper-table v-else-if="node.type === 'table'" :pNode="node"/>
                        <paper-list v-else-if="node.type === 'list'" :pNode="node"/>
                    </template>
                </div>
            </div>
        </div>
    `,
})
export default class Editor extends Vue {

    @Prop()
    test: any

    @Prop()
    status: any

    @Prop()
    selection: any

    @Prop()
    document: any

    get lastCaret() {
        const carets = this.selection.carets
        return carets.length > 1 ? carets[carets.length - 1] : {}
    }

    get classes() {
        return {
            active: this.status.active,
        }
    }

    onKeydown(e: KeyboardEvent) {
        if (e.key === 'BackSpace') {
            this.$emit('execCommand', 'delete')
        }
    }

    onInput(e: KeyboardEvent) {
        this.$emit('execCommand', 'insertText', (e.target as HTMLTextAreaElement).value)
        ; (e.target as HTMLTextAreaElement).value = ''
    }
}
