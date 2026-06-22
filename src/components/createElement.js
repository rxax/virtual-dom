export default (tagName, { attrs = {}, children = [] } = {}) => {
    const elem = Object.create(null);
    Object.assign(elem, {
        tagName,
        attrs,
        children,
    });
    return elem;
};