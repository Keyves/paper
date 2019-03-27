import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    template: `
        <table class="paper-table">
            <tbody>
                <tr v-for="(row, rIndex) in pNode.children" :style="row.style">
                    <td
                        v-for="(cell, cIndex) in row.children"
                        :style="cell.style"
                        :key="cell.id"
                        v-plain="cell.text"
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    `,
})
export default class Table extends Vue {
    @Prop()
    pNode: any
}
