import { IJSONObject } from 'src/@types/global'

export function shallowEqual(a: IJSONObject, b: IJSONObject): boolean {
    if (a === b) {
        return true
    } else if (!a && b || !b && a) {
        return false
    }

    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    let i
    let aKey
    let bKey

    if (aKeys.length !== bKeys.length) {
        return false
    }

    for (i = 0; i < aKeys.length; i++) {
        aKey = aKeys[i]
        bKey = bKeys[i]
        if (aKey !== bKey || a[aKey] !== b[bKey]) {
            return false
        }
    }

    return true
}

export function clone(obj: any, opts?: any) {
    opts = Object.assign({}, obj, opts)
    return new obj.constructor(opts)
}
