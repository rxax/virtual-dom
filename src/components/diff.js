import render from './render';

const zip = (xs, ys) => {
    const zipped = [];
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
};

const diffAttrs = (oldAttrs, newAttrs) => {
    // Handle different attributes
    const patches = [];

    // setting newAttrs
    for (const [k, v] of Object.entries(newAttrs)) {
        patches.push(node => {
            node.setAttribute(k, v);
            return node;
        });
    }

    // removing attrs
    for (const k in oldAttrs) {
        if (!(k in newAttrs)) {
            patches.push(node => {
                node.removeAttribute(k);
                return node;
            });
        }
    }

    return node => {
        for (const patch of patches) {
            patch(node);
        }
        return node;
    };
};

const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childPatches.push(diff(oldVChild, newVChildren[i]));
    });

    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVChild));
            return $node;
        });
    }

    return $parent => {
        // since childPatches are expecting the $child, not $parent,
        // we cannot just loop through them and call patch($parent)
        for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
            patch($child);
        }

        for (const patch of additionalPatches) {
            patch($parent);
        }
        return $parent;
    };
};

const diff = (oldVirtualTree, newVirtualTree) => {
    if (typeof oldVTree === 'undefined') {
        // oldVirtualTree is null, return undefined
        return undefined;
    }
    if (newVirtualTree === undefined) {
        return node => {
            node.remove();
            // new virtual tree is null, return undefined
            return undefined;
        }
    }

    if (typeof oldVirtualTree === 'string' ||
        typeof newVirtualTree === 'string') {
        if (oldVirtualTree !== newVirtualTree) {
            // for text nodes render the new virtual tree
            return node => {
                const newNode = render(newVirtualTree);
                node.replaceWith(newNode);
                return newNode;
            };
        } else {
            // both trees have the same value
            return node => node;
        }
    }

    if (oldVirtualTree.tagName !== newVirtualTree.tagName) {
        // render the newVTree and mount it.
        return node => {
            const newNode = render(newVirtualTree);
            node.replaceWith(newNode);
            return newNode;
        };
    }

    //At this point:
    /*
    oldVirtualTree and newVirtualTree are both virtual elements.
    They have the same tagName.
    They might have different attrs and children.
     */
    const patchAttrs = diffAttrs(oldVirtualTree.attrs, newVirtualTree.attrs);
    const patchChildren = diffChildren(oldVirtualTree.children, newVirtualTree.children);

    return node => {
        patchAttrs(node);
        patchChildren(node);
        return node;
    };
};

export default diff;