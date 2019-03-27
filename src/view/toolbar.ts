import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    template: `
        <div class="paper-toolbar">
            <c-tooltip position="bottom" text="加粗">
                <c-button icon="format_bold" shape="circle" ghost @click.prevent="onBold"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="斜体">
                <c-button icon="format_italic" shape="circle" ghost @click.prevent="onItalic"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="下划线">
                <c-button icon="format_underlined" shape="circle" ghost @click.prevent="onUnderline"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="删除线">
                <c-button icon="format_strikethrough" shape="circle" ghost @click.prevent="onStrikeThrough"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="水平线">
                <c-button icon="remove" shape="circle" ghost @click.prevent="onInsertHorizontalRule"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="表格">
                <c-button icon="grid_on" shape="circle" ghost @click.prevent="onInsertTable"></c-button>
            </c-tooltip>
            <c-tooltip position="top-left" text="字号">
                <c-select v-model="fontSize" @select="onFontSize">
                    <c-option v-for="size in 10" :key="size" :value="(size + 15).toString()">{{size + 15}}</c-option>
                </c-select>
            </c-tooltip>
            <c-tooltip position="bottom" text="两端对齐">
                <c-button icon="format_align_justify" shape="circle" ghost @click.prevent="onJustifyFull"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="居中">
                <c-button icon="format_align_center" shape="circle" ghost @click.prevent="onJustifyCenter"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="左对齐">
                <c-button icon="format_align_left" shape="circle" ghost @click.prevent="onJustifyLeft"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="右对齐">
                <c-button icon="format_align_right" shape="circle" ghost @click.prevent="onJustifyRight"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="有序列表">
                <c-button icon="format_list_numbered" shape="circle" ghost @click.prevent="onInsertOrderedList"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="无序列表">
                <c-button icon="format_list_bulleted" shape="circle" ghost @click.prevent="onInsertUnorderedList"></c-button>
            </c-tooltip>
            <c-tooltip position="bottom" text="合并单元格">
                <c-button icon="border_outer" shape="circle" ghost @click.prevent="onMergeCells"></c-button>
            </c-tooltip>
        </div>
    `,
})
export default class Editor extends Vue {
    fontSize = '15'

    // custom commands
    onMergeCells() { this.$emit('execCommand', 'mergeCells') }
    onInsertTable() { this.$emit('execCommand', 'insertTable') }

    // document commands
    onBackColor() { this.$emit('execCommand', 'backColor') }
    onBold() { this.$emit('execCommand', 'bold') }
    onContentReadOnly() { this.$emit('execCommand', 'contentReadOnly') }
    onCopy() { this.$emit('execCommand', 'copy') }
    onCreateLink() { this.$emit('execCommand', 'createLink') }
    onCut() { this.$emit('execCommand', 'cut') }
    onDecreaseFontSize() { this.$emit('execCommand', 'decreaseFontSize') }
    onDelete() { this.$emit('execCommand', 'delete') }
    onEnableInlineTableEditing() { this.$emit('execCommand', 'enableInlineTableEditing') }
    onEnableObjectResizing() { this.$emit('execCommand', 'enableObjectResizing') }
    onFontName() { this.$emit('execCommand', 'fontName') }
    onFontSize() { this.$emit('execCommand', 'fontSize') }
    onForeColor() { this.$emit('execCommand', 'foreColor') }
    onstyleBlock() { this.$emit('execCommand', 'styleBlock') }
    onForwardDelete() { this.$emit('execCommand', 'forwardDelete') }
    onHeading() { this.$emit('execCommand', 'heading') }
    onHiliteColor() { this.$emit('execCommand', 'hiliteColor') }
    onIncreaseFontSize() { this.$emit('execCommand', 'increaseFontSize') }
    onIndent() { this.$emit('execCommand', 'indent') }
    onInsertBrOnReturn() { this.$emit('execCommand', 'insertBrOnReturn') }
    onInsertHorizontalRule() { this.$emit('execCommand', 'insertHorizontalRule') }
    onInsertHTML() { this.$emit('execCommand', 'insertHTML') }
    onInsertImage() { this.$emit('execCommand', 'insertImage') }
    onInsertOrderedList() { this.$emit('execCommand', 'insertOrderedList') }
    onInsertUnorderedList() { this.$emit('execCommand', 'insertUnorderedList') }
    onInsertParagraph() { this.$emit('execCommand', 'insertParagraph') }
    onInsertText() { this.$emit('execCommand', 'insertText') }
    onItalic() { this.$emit('execCommand', 'italic') }
    onJustifyCenter() { this.$emit('execCommand', 'justifyCenter') }
    onJustifyFull() { this.$emit('execCommand', 'justifyFull') }
    onJustifyLeft() { this.$emit('execCommand', 'justifyLeft') }
    onJustifyRight() { this.$emit('execCommand', 'justifyRight') }
    onOutdent() { this.$emit('execCommand', 'outdent') }
    onPaste() { this.$emit('execCommand', 'paste') }
    onRedo() { this.$emit('execCommand', 'redo') }
    onRemovestyle() { this.$emit('execCommand', 'removestyle') }
    onSelectAll() { this.$emit('execCommand', 'selectAll') }
    onStrikeThrough() { this.$emit('execCommand', 'strikeThrough') }
    onSubscript() { this.$emit('execCommand', 'subscript') }
    onSuperscript() { this.$emit('execCommand', 'superscript') }
    onUnderline() { this.$emit('execCommand', 'underline') }
    onUndo() { this.$emit('execCommand', 'undo') }
    onUnlink() { this.$emit('execCommand', 'unlink') }
    onUseCSS() { this.$emit('execCommand', 'useCSS') }
    onStyleWithCSS() { this.$emit('execCommand', 'styleWithCSS') }
}
