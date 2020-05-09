const assert = require('assert')
const rulesEngine = require('./rules')

describe('[rules.js] Rules', () => {
    const mockUrls = [
        "http://www.google.com/search", "https://www.google.co.uk/search",
        "https://fergus.london/blog",   "https://mit.edu/",
        "http://bbc.co.uk/search",      "http://news.sky.com/",
        "http://sports.bbc.co.uk/",     "http://github.com/FergusInLondon"
    ]

    describe('ruleForUrl', () => {
        it('should not match to an empty pattern list', () => {
            rulesEngine.load('')

            assert.equal(mockUrls.filter((url) => {
                return rulesEngine.ruleForUrl(url) != null
            }).length, 0)
        }) /*

        it('should match on domain names', () => {
            rulesEngine.load('spec/fixtures/*.domain.json')

            assert.equal(mockUrls.filter((url) => {
                return rulesEngine.ruleForUrl(url) != null
            }).length, 1)
        })

        it('should match on sub domain names', () => {
            rulesEngine.load('spec/fixtures/*.sub-domain.json')

            assert.equal(mockUrls.filter((url) => {
                return rulesEngine.ruleForUrl(url) != null
            }).length, 1)
        })


        it('should match on protocols', () => {
            rulesEngine.load('spec/fixtures/*.protocol.json')

            assert.equal(mockUrls.filter((url) => {
                return rulesEngine.ruleForUrl(url) != null
            }).length, 5)
        })

        it('should match on paths', () => {
            rulesEngine.load('spec/fixtures/*.path.json')

            assert.equal(mockUrls.filter((url) => {
                return rulesEngine.ruleForUrl(url) != null
            }).length, 1)
        })

        it('wildcard should match all request routes', () => {
            rulesEngine.load('spec/fixtures/*.wildcard.json')

            assert.equal(mockUrls.filter((url) => {
                return rulesEngine.ruleForUrl(url) != null
            }).length, mockUrls.length)
        }) */
    })
})
