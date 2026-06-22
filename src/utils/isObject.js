const isObject = (val) => {
    /**
     * Check if obj is an actual object
     */
    if (val === null) { return false; }
    return ( (typeof val === 'function') || (typeof val === 'object') );

}

export default isObject;