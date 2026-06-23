import isObject from "./isObject";

const isVDomNode = (node) => {
    const validNodeKeys = ['tagName','attrs','children','innerText']
    let success = false;
    if(isObject(node)){
        success = Object.keys(node).every((val) => validNodeKeys.includes(val))
    }
    return success;
}

export default isVDomNode;