import render from './render';

export default (node, target) => {
    const rendered = render(node);
    target.innerHTML = '';
    target.appendChild(rendered);
    return target;
};