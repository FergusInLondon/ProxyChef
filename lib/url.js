const UrlPattern = require('url-pattern')
const logger = require('./log')

module.exports = {
    match(req, patterns) {
        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        let isMatch = false
        let pattern = null
    
        for (p of patterns) {
            result = (new UrlPattern(p)).match(url)
            if (result != undefined) {
                logger.info("matched pattern for '%s'", url)
                isMatch = true
                pattern = result
                break
            }
        }
    
        return {url, isMatch, pattern}
    }
};
