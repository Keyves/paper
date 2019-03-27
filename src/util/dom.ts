export function createNativeRange(startNode: Node, startOffset: number, endNode: Node, endOffset: number): Range {
    const range = document.createRange()
    range.setStart(startNode, startOffset)
    range.setEnd(endNode, endOffset)
    return range
}

export function addClickoutListener(...args: any[]) {
    const callback = args.pop()

    function clickout(e: MouseEvent) {
        const element = e.target
        if (args.some(el => el.contains(element))) {
            return
        }
        callback()
    }
    document.addEventListener('click', clickout, false)

    return function() {
        document.removeEventListener('click', clickout)
    }
}

export function checkTagName(el: HTMLElement, tagName: string) {
    return el.tagName.toLowerCase() === tagName
}

export function duplicateRectFilter(rects: ClientRectList | DOMRectList) {
    const newRects = Array.from(rects)
    return newRects
    .reduce((result, rect) => {
        if (result.length > 1) {
            // filter 'duplicate' rect, which be contained in previous rect
            const lastRect = result[result.length - 1] as DOMRect
            if (!(
                rect.top <= lastRect.top
                && rect.bottom <= lastRect.bottom
                && rect.left >= lastRect.left
                && rect.right <= lastRect.right
            )) {
                result.push(rect)
            }
        } else {
            result.push(rect)
        }
        return result
    }, [] as typeof newRects)
}

export const caretRangeFromPoint = (() => {
    if (document.caretRangeFromPoint) { // standard (WebKit)
        return function(x: number, y: number): Range {
            return document.caretRangeFromPoint(x, y)
        }
    } else if ((document as any).caretPositionFromPoint) { // Mozilla
        return function(x: number, y: number): Range {
            let position
            let range
            position = (document as any).caretPositionFromPoint(x, y)
            range = document.createRange()
            range.setStart(position.offsetNode, position.offset)
            range.collapse(true)
            return range
        }
    } else if ((document.body as any).createTextRange) { // IE
        return function(x: number, y: number): Range {
            const range = (document.body as any).createTextRange()
            range.moveToPoint(x, y)
            return range
        }
    } else {
        throw new Error('unsupport caret range from point')
    }
})()
