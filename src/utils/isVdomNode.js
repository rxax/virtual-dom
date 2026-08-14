import isObject from "./isObject";

const isVDomNode = (node) => {
    if (!isObject(node) || Array.isArray(node)) {
        return false;
    }

    return typeof node.tagName === 'string' &&
        node.attrs !== undefined &&
        node.children !== undefined;
};

export default isVDomNode;