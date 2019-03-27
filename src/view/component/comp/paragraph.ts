import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import PaperLink from 'src/view/component/inline/link'
import PaperSpan from 'src/view/component/inline/span'

@Component({
    components: { PaperLink, PaperSpan },
    template: `
        <div
            class="paper-paragraph"
            :style="pNode.style"
            >
            <div class="paper-line" v-for="line in pNode.lines">
                <template v-for="(child, index) in line.children">
                    <paper-link
                        v-if="child.type === 'link'"
                        :pNode="child"
                        :key="child.id"
                    />
                    <paper-span
                        v-else-if="child.type === 'span'"
                        :pNode="child"
                        :key="child.id"
                        >
                    </paper-span>
                </template>
            </div>
        </div>
    `,
})
export default class Paragraph extends Vue {
    @Prop()
    pNode: any
}
