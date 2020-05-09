const logger = require('../log')

const logCtx = (direction, propsToLog) => {
    return (ctx) => {
        logger.info(`have ${direction} payload`)
        propsToLog.forEach((prop) => {
            logger.info(ctx[prop])
        })
    }
}

module.exports = {
    inbound: logCtx('inbound', ['proxyRes']),
    outbound: logCtx('outbound', ['req'])
}
