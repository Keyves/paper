import PaperInlineNode from 'src/model/node/abstract/inline'
import Vue, { VNode, VNodeDirective } from 'vue'
import renderer from 'src/renderer'
import { IJSONObject } from 'src/@types/global'

Vue.directive('plain', {
    bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
        const domNode = document.createTextNode(binding.value)
        renderer.setDOMNode(vnode.key as number, domNode)
        if (vnode.context) {
            renderer.setPaperNode(domNode, (vnode.context.$options.propsData as IJSONObject).pNode as PaperInlineNode)
        }
        el.appendChild(domNode)
    },
    update(_el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
        const domNode = renderer.getDOMNode(vnode.key as number)
        if (domNode.nodeValue !== binding.value) {
            // fix empty node can't get bounding rect (selection information)
            domNode.nodeValue = binding.value || ' '
        }
    },
    unbind(_el: HTMLElement, _binding: VNodeDirective, vnode: VNode) {
        const domNode = renderer.getDOMNode(vnode.key as number)
        renderer.deleteDOMNode(vnode.key as number)
        renderer.deletePaperNode(domNode)
    },
})
