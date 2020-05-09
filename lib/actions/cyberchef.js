const { evaluate } = require('../adapters/cyberchef')
const logger = require('../log')

module.exports = {
    inbound({content, opts}){
        const evaluatedContent = evaluate(content, opts.steps)
        logger.info("have inbound payload")
        logger.info(evaluatedContent)
        logger.info("performed cyberchef transformation")

    },
    outbound({content, opts}){
        const evaluatedContent = evaluate(content, opts.steps)
        logger.info(evaluatedContent)
        logger.info("performed cyberchef transformation")
    }
}
