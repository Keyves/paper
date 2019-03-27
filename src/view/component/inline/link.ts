import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    template: `
        <a
            class="paper-link"
            :style="pNode.style"
            :href="pNode.href"
            :key="pNode.id"
            v-plain="pNode.text"
            >
        </a>
    `,
})
export default class Link extends Vue {
    @Prop()
    pNode: any
}
