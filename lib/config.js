/**
 * Convenience method for accessing environment variables with defaults.
 * 
 * @param {String} key 
 * @param {String} def 
 * @returns {String}
 */
const getEnvWithDefault = (key, def) => {
    if (process.env.hasOwnProperty(key)) {
        return process.env[key]
    }

    return def
}

module.exports = {
    LISTEN_PORT_HTTP: getEnvWithDefault("HTTP_LISTEN_PORT", "8082"),
    LISTEN_PORT_HTTPS: getEnvWithDefault("HTTPS_LISTEN_PORT", "8083"),
    LOGGING_ENABLED: getEnvWithDefault("LOGGING_ENABLED", "TRUE").toLowerCase() == "true",
    LOG_TO_CLI: getEnvWithDefault("PRETTY_LOGGING", "TRUE").toLowerCase() == "true"
}
