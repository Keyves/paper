import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import PaperLink from 'src/view/component/inline/link'
import PaperSpan from 'src/view/component/inline/span'

@Component({
    components: { PaperLink, PaperSpan },
    template: `
        <ul
            class="paper-list"
            :style="pNode.style"
            >
            <li v-for="(li, lIndex) in pNode.children" :style="li.style">
                <template v-for="(pNode, bIndex) in li.children">
                    <paper-link
                        v-if="pNode.type === 'link'"
                        :pNode="pNode"
                        :key="pNode.id"
                    />
                    <paper-span
                        v-else-if="pNode.type === 'span'"
                        :pNode="pNode"
                        :key="pNode.id"
                        >
                    </paper-span>
                </template>
            </li>
        </ul>
    `,
})
export default class Paragraph extends Vue {
    @Prop()
    pNode: any
}
