const   http                = require('http'),
        httpProxy           = require('http-proxy'),
        logger              = require('./log.js'),
        { ruleForUrl }      = require('./rules.js'),
        { handlers }        = require('./actions/actions.js'),
        { readResource, validActions }  = require('./util.js')

const proxy = httpProxy.createProxyServer({})

/**
 * The proxyRes event is fired by the httpProxy when a response is received
 *  from a proxied request. In this handler we interecept the response, and
 *  run any actions that are required.
 */
proxy.on('proxyRes', async (proxyRes, req, res) => {
    const respContent = await readResource(proxyRes)

    const reqRule = ruleForUrl(req.url)
    if (!reqRule || !reqRule.inbound) {
        res.write(respContent)
        res.end()
        return
    }

    logger.info("found matching rule for response")
    validActions(reqRule.inbound).forEach((action) => {
        handlers[action].inbound({
            req, res, proxyRes,
            content: respContent,
            opts: reqRule.inbound[action]
        })
    })
});

/**
 * This is a simple endpoint that accepts a request, determines whether any rules
 * apply to the request, and - if so - applies them via the available handlers.
 */
module.exports = http.createServer(async (req, res) => {
    const reqRule = ruleForUrl(req.url)
    if (reqRule && reqRule.outbound) {
        logger.info("found matching rule for request")

        const respContent = await readResource(req)
        validActions(reqRule.outbound || []).forEach((action) => {
            handlers[action].outbound({
                req, res,
                content: respContent,
                opts: reqRule.outbound[action]
            })
        })

        if (reqRule.outbound.blackhole) {
            return
        }
    }

    proxy.web(req, res, {
        target: req.url,
        selfHandleResponse: true
    }, (err) => {
        logger.error("error encountered whilst attempting to proxy request", err)
        res.statusCode = 502 // Bad Gateway
        res.end()
    })
})
