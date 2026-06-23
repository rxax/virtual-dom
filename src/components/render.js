import isIterable from "../utils/isIterable";
import isVdomNode from "../utils/isVdomNode";
import {onComponentUpdate} from "./handlers";

const render = (node) => {
    //console.log(node)
    // Render a text node
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    // return empty text node as the Node argument is not a virtual dom node nor a text
    if(!isVdomNode(node)) {
        console.log('invalid virtual dom')
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

    // Set inner text
    //console.log('x=',node.innerText)
    if(Object.hasOwn(node,'innerText') && node.innerText != null){
        dom_el.innerText=node.innerText;
    }

    // append all children as specified in vNode.children
    //   e.g. <div id="app"><img></div>
    if(isIterable(node.children)) {
        for (const child of node.children) {
            dom_el.appendChild(render(child));
        }
    }

    //Attach listeners
    // listen to component changes
    "keypress input click".split(" ").forEach((event)=>{
        dom_el.addEventListener(event, (event) => onComponentUpdate(event, node), false);
    });

    // Return the dom elements
    return dom_el;
};

export default render;