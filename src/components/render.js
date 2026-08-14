import isIterable from "../utils/isIterable";
import isVdomNode from "../utils/isVdomNode";
import {onComponentUpdate} from "./handlers";

const normalizeChildren = (children) => {
    if (children === null || children === undefined) {
        return [];
    }

    if (Array.isArray(children)) {
        return children.flat();
    }

    return [children];
};

const setAttribute = (element, key, value) => {
    if (value === null || value === undefined || value === false) {
        element.removeAttribute(key);
        return;
    }

    if (value === true) {
        element.setAttribute(key, '');
        return;
    }

    element.setAttribute(key, String(value));
};

const render = (node) => {
    if (node === null || node === undefined) {
        return document.createTextNode('');
    }

    if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
        return document.createTextNode(String(node));
    }

    if (Array.isArray(node)) {
        const fragment = document.createDocumentFragment();
        node.forEach((child) => fragment.appendChild(render(child)));
        return fragment;
    }

    if (!isVdomNode(node)) {
        return document.createTextNode('');
    }

    const domEl = document.createElement(node.tagName);

    for (const [key, value] of Object.entries(node.attrs || {})) {
        setAttribute(domEl, key, value);
    }

    if (node.innerText !== null && node.innerText !== undefined) {
        domEl.textContent = String(node.innerText);
    }

    for (const child of normalizeChildren(node.children)) {
        domEl.appendChild(render(child));
    }

    "keypress input click".split(" ").forEach((event) => {
        domEl.addEventListener(event, (event) => onComponentUpdate(event, node), false);
    });

    return domEl;
};

export default render;