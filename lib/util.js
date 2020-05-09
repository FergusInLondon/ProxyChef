const { handlers } = require('./actions/actions.js')

/**
 * Reads a stream through to completion.
 * 
 * @param {Stream} Stream Resource to read
 * @returns {Promise} Promise resolving to the string contents of the stream.
 */
const readResource = (res) => {
    return new Promise((resolve, reject) => {
        let resourceData = []

        res.on('data', (chunk) => {
            resourceData.push(chunk)
        })
    
        res.on('end', () => {
            resolve(Buffer.concat(resourceData).toString())
        })
    })
}

/**
 * Accepts a list of possible action keys, and returns those that
 * resolve to a valid handler.
 * 
 * @param {string[]} Identifiers of valid actions that possess a handler.
 */
const validActions = (actions) => {
    return Object.keys(actions).filter(
        action => handlers.hasOwnProperty(action)
    )
}

module.exports = {
    readResource, validActions
}
