const config = require("../config.json").logging

// @see https://github.com/pinojs/pino/blob/master/docs/api.md#options
const logger = require('pino')({
    name:           "ProxyChef",
    enabled:        config.enabled,
    prettyPrint:    config.CLI,
})

module.exports = logger
