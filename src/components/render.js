import isIterable from "../utils/isIterable";
import isVdomNode from "../utils/isVdomNode";

const render = (node) => {

    // Render a text node
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    // return empty text node as the Node argument is not a virtual dom node nor a text
    if(!isVdomNode(node)) {
        return document.createTextNode('');
    }
    // create the element
    //   e.g. <a></a>
    const dom_el = document.createElement(node.tagName);

    // add all attributes as specified in node.attrs
    //   e.g. <div id="app"></div>
    for (const [k, v] of Object.entries(node.attrs)) {
        dom_el.setAttribute(k, v);
    }

    // append all children as specified in vNode.children
    //   e.g. <div id="app"><img></div>
    if(isIterable(node.children)) {
        for (const child of node.children) {
            dom_el.appendChild(render(child));
        }
    }

    // Return the dom elements
    return dom_el;
};

export default render;