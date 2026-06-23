
// Constants
export const EMPTY = null;

// Generate random UID
const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Base Tag, super of all
export const HtmlTag = (tagName, { attrs = {}, children = [] } = {}) => {
    const elem = Object.create(null);
    Object.assign(elem, {
        tagName,
        attrs,
        children,
        innerText: null,
    });
    return elem;
};

// Generic Tag with Inner text
export const HTMLTagWithInnerText = (tagName, text=null, attrs={}, children=null) => {
    // set inner text
    const node = HtmlTag(tagName, {
        attrs: attrs,
        children: children
    });
    node.innerText = text;
    return node;
}

// Create generic H tags
export const H1Tag = (text, attrs, children) => HTMLTagWithInnerText('h1', text, attrs, children);
export const H2Tag = (text, attrs, children) => HTMLTagWithInnerText('h2', text, attrs, children);
export const H3Tag = (text, attrs, children) => HTMLTagWithInnerText('h3', text, attrs, children);
export const H4Tag = (text, attrs, children) => HTMLTagWithInnerText('h4', text, attrs, children);
export const H5Tag = (text, attrs, children) => HTMLTagWithInnerText('h5', text, attrs, children);
export const H6Tag = (text, attrs, children) => HTMLTagWithInnerText('h6', text, attrs, children);


// Generic Input
export const Input = (attrs, children) => HtmlTag('input', { attrs, children })

export const Button = (text, attrs, children) => {
    const node = HtmlTag('button', { attrs, children });
    node.innerText = text;
    return node;
}

// generic label
export const Label = (text, attrs, children) => HTMLTagWithInnerText ('label', text, attrs, children);

// Labeled Input
export const LabeledInput = (labelText, button_attrs, group_attrs={}) => {
    // set for value for the label
    if(!Object.hasOwn(button_attrs, 'id')) {
        button_attrs.id = uid();
    }
    const label_node = Label(labelText, { 'for': button_attrs.id }, null);
    const input_node = Input(button_attrs, null);

    return HtmlTag('div', { attrs:group_attrs, children:[ label_node, input_node] });
}

// Entry point
export const App = ({ attrs = {}, children = [] } = {}) => {
    return HtmlTag('div', { attrs:attrs, children: children });
}

