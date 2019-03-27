import Vue from 'vue'
import Paper from 'src'
import documentData from './mock/document.data'
import './debug.scss'

new Vue({
    template: `
        <div :style="{display: 'flex'}" @mousemove="onMousemove">
            <div :style="{
                    width: '150px',
                    fontSize: '14px',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    padding: '10px',
                    whiteSpace: 'pre-wrap',
                    height: '500px'
                }"
                >
                <div>pageX:\t{{pageX}}</div>
                <div>pageY:\t{{pageY}}</div>
                <div>screenX:\t{{screenX}}</div>
                <div>screenY:\t{{screenY}}</div>
                <div>clientX:\t{{clientX}}</div>
                <div>clientY:\t{{clientY}}</div>
            </div>
            <div ref="editor">editor</div>
        </div>
    `,
    data() {
        return {
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            screenX: 0,
            screenY: 0,
        }
    },
    methods: {
        onMousemove(e: MouseEvent) {
            this.pageX = e.pageX
            this.pageY = e.pageY
            this.screenX = e.screenX
            this.screenY = e.screenY
            this.clientX = e.clientX
            this.clientY = e.clientY
        },
    },
    mounted() {
        (window as any).paper = new Paper({
            selector: this.$refs.editor,
            content: documentData,
        })
    },
}).$mount('#app')

; (window as any).log = function() {
    console.log.apply(console, [].map.call(arguments, (v: any) => v && JSON.parse(JSON.stringify(v))))
}
Object.defineProperty(Object.prototype, 'toLog', {
    enumerable: false,
    configurable: true,
    get() {
        return JSON.parse(JSON.stringify(this))
    },
})
