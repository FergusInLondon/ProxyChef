const   urlPattern = require('url-pattern'),
        logger = require('./log'),
        glob = require('glob'),
        fs = require('fs')

/**
 * RulesEngine is responsible for loading rules from .json files, and evaluating whether
 * any of those rules apply to a given URL.
 */
function RulesEngine() {
    let ruleset = []

    const match = (url, patterns) => {
        let isMatch = false
        let pattern = null

        for (const p of patterns) {
            if (p == '*') {
                return {url, isMatch: true, pattern: '*'}
            }

            const result = (new urlPattern(p)).match(url)
            if (result != undefined) {
                logger.info("matched pattern for '%s'", url)
                isMatch = true
                pattern = result
                break
            }
        }
    
        return {url, isMatch, pattern}
    }

    return {
        /**
         * Finds the first matching rule for a given URL. Returns null if no applicable rule is found.
         * @param {String} url
         */
        ruleForUrl(url) {
            for (const rule of ruleset) {
                if (match(url, rule.patterns).isMatch) {
                    return rule
                }
            }
    
            return null
        },
        /**
         * Loads all rules from the .json files expected to be contained in './rules/'.
         */
        load(rulesGlob) {
            ruleset = []
            glob.sync(rulesGlob).forEach((file) => {
                const rule = JSON.parse(fs.readFileSync(file))
                ruleset.push(rule)
            })
        }
    }
}

module.exports = RulesEngine()
