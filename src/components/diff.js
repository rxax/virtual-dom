import render from './render';
import isVdomNode from '../utils/isVdomNode';

const isTextNode = (value) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';

const diffAttrs = (oldAttrs = {}, newAttrs = {}) => {
    const oldKeys = Object.keys(oldAttrs || {});
    const newKeys = Object.keys(newAttrs || {});

    return (node) => {
        for (const key of newKeys) {
            const nextValue = newAttrs[key];
            const previousValue = oldAttrs[key];

            if (previousValue !== nextValue) {
                if (nextValue === null || nextValue === undefined || nextValue === false) {
                    node.removeAttribute(key);
                } else if (nextValue === true) {
                    node.setAttribute(key, '');
                } else {
                    node.setAttribute(key, String(nextValue));
                }
            }
        }

        for (const key of oldKeys) {
            if (!(key in (newAttrs || {}))) {
                node.removeAttribute(key);
            }
        }

        return node;
    };
};

const diffChildren = (oldChildren = [], newChildren = []) => {
    return (node) => {
        const maxLength = Math.max(oldChildren.length, newChildren.length);

        for (let index = 0; index < maxLength; index += 1) {
            const oldChild = oldChildren[index];
            const newChild = newChildren[index];
            const childNode = node.childNodes[index];

            if (newChild === undefined) {
                if (childNode) {
                    childNode.remove();
                }
                continue;
            }

            if (oldChild === undefined) {
                node.appendChild(render(newChild));
                continue;
            }

            if (childNode) {
                const patch = diff(oldChild, newChild);
                if (patch) {
                    patch(childNode);
                }
            }
        }

        return node;
    };
};

const diff = (oldVirtualTree, newVirtualTree) => {
    if (oldVirtualTree === newVirtualTree) {
        return (node) => node;
    }

    if (oldVirtualTree === undefined || oldVirtualTree === null) {
        return (node) => {
            const replacement = render(newVirtualTree);
            if (node && node.replaceWith) {
                node.replaceWith(replacement);
                return replacement;
            }
            return replacement;
        };
    }

    if (newVirtualTree === undefined || newVirtualTree === null) {
        return (node) => {
            if (node && node.remove) {
                node.remove();
            }
            return undefined;
        };
    }

    if (isTextNode(oldVirtualTree) || isTextNode(newVirtualTree)) {
        if (String(oldVirtualTree) !== String(newVirtualTree)) {
            return (node) => {
                const replacement = render(newVirtualTree);
                if (node && node.replaceWith) {
                    node.replaceWith(replacement);
                    return replacement;
                }
                return replacement;
            };
        }

        return (node) => node;
    }

    if (!isVdomNode(oldVirtualTree) || !isVdomNode(newVirtualTree)) {
        return (node) => {
            const replacement = render(newVirtualTree);
            if (node && node.replaceWith) {
                node.replaceWith(replacement);
                return replacement;
            }
            return replacement;
        };
    }

    if (oldVirtualTree.tagName !== newVirtualTree.tagName) {
        return (node) => {
            const replacement = render(newVirtualTree);
            if (node && node.replaceWith) {
                node.replaceWith(replacement);
                return replacement;
            }
            return replacement;
        };
    }

    const patchAttrs = diffAttrs(oldVirtualTree.attrs, newVirtualTree.attrs);
    const patchChildren = diffChildren(oldVirtualTree.children, newVirtualTree.children);

    return (node) => {
        if (node && oldVirtualTree.innerText !== newVirtualTree.innerText) {
            node.textContent = newVirtualTree.innerText === null || newVirtualTree.innerText === undefined
                ? ''
                : String(newVirtualTree.innerText);
        }

        patchAttrs(node);
        patchChildren(node);
        return node;
    };
};

export const patch = (node, oldVirtualTree, newVirtualTree) => {
    const patchFn = diff(oldVirtualTree, newVirtualTree);
    return patchFn(node);
};

export default diff;