describe("url", () => {
    const { match } = require('../lib/url')

    const reqGenerator = ({protocol, host, url}) => {
        return {
            protocol,
            originalUrl: url,
            get(h) {
                return host
            }
        }
    }
    
    const mockRequests = [
        {protocol: "http",  host: "www.google.com",     url: "/search" },
        {protocol: "https", host: "www.google.co.uk",   url: "/search" },
        {protocol: "https", host: "fergus.london",      url: "/blog" },
        {protocol: "https", host: "mit.edu",            url: "/" },
        {protocol: "http",  host: "bbc.co.uk",          url: "/search" },
        {protocol: "http",  host: "news.sky.com",       url: "/" },
        {protocol: "http",  host: "sports.bbc.co.uk",     url: "/" },
        {protocol: "http",  host: "github.com",         url: "/FergusInLondon" }
    ]

    it("should not match to an empty pattern list", () => {
        for (req of mockRequests) {
            expect(match(reqGenerator(req), []).isMatch).toBeFalse()
        }
    })

    it("wildcard should match all request routes", () => {
        for (req of mockRequests) {
            expect(match(reqGenerator(req), ['*']).isMatch).toBeTrue()
        }
    })

    it("should match on domain names", () => {
        let matchCount = 0

        for (req of mockRequests) {
            if (match(reqGenerator(req), ['(http(s)\\://)mit.edu(/*)']).isMatch) {
                matchCount++
            }
        }

        expect(matchCount).toBe(1)
    })

    it("should match on sub domain names", () => {
        let matchCount = 0

        for (req of mockRequests) {
            if (match(reqGenerator(req), ['(http(s)\\://)news.:domain.:tld(/*)']).isMatch) {
                matchCount++
            }
        }

        expect(matchCount).toBe(1)
    })

    it("should match on protocols", () => {
        let matchCount = 0

        for (req of mockRequests) {
            if (match(reqGenerator(req), ['http\\://(:subdomain.):domain(.:co).:tld(/*)']).isMatch) {
                matchCount++
            }
        }

        expect(matchCount).toBe(5)
    })

    it("should match on paths", () => {
        let matchCount = 0

        for (req of mockRequests) {
            if (match(reqGenerator(req), ['http\\://(:subdomain.):domain(.:co).:tld/FergusInLondon']).isMatch) {
                matchCount++
            }
        }

        expect(matchCount).toBe(1)
    })
    
    it("should return matched variables", () => {
        let matchCount = 0
        let matchResponse = {}

        for (req of mockRequests) {
            matched = match(reqGenerator(req), ['https\\://fergus.london/:path'])
            if (matched.isMatch) {
                matchResponse = matched
                matchCount++
            }
        }

        expect(matchCount).toBe(1)
        expect(matchResponse.pattern.path).toBe("blog")
    })
})
