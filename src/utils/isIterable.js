import isObject from "./isObject";

const isIterable = (obj) => {
    // checks for null and undefined, returns True if object is iterable
    if(isObject(obj)) {
        return typeof obj[Symbol.iterator] === 'function';
    } else {
        return false;
    }
}

export default isIterable;