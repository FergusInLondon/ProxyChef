const config = require("./config")

// @see https://github.com/pinojs/pino/blob/master/docs/api.md#options
module.exports = require('pino')({
    name:           "ProxyChef",
    enabled:        config.LOGGING_ENABLED,
    prettyPrint:    config.LOG_TO_CLI,
})
