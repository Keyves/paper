import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    template: `
        <span
            :style="pNode.style"
            :key="pNode.id"
            v-plain="pNode.text"
            >
        </span>
    `,
})
export default class Span extends Vue {
    @Prop()
    pNode: any
}
