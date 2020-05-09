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
    
        for (p of patterns) {
            result = (new urlPattern(p)).match(url)
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
            for (rule of ruleset) {
                if (match(url, rule.patterns).isMatch) {
                    return rule
                }
            }
    
            return null
        },
        /**
         * Loads all rules from the .json files expected to be contained in './rules/'.
         */
        load() {
            glob('rules/*.rule.json', (err, files) => {
                files.forEach((file) => {
                    fs.readFile(file, (err, data) => {
                        rule = JSON.parse(data)
                        ruleset.push(rule)
                    })
                })
            })
        }
    }
}

module.exports = RulesEngine()
