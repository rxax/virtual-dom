export const onComponentUpdate = (event, node) => {
    console.log('component '+node.tagName+' updated by'+event)
}