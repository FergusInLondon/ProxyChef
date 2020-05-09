/**
 * ProxyChef entrypoints. This does very little other than to parse the environment
 * for configuration variables, ensure that all .json rules are loaded, and then kick
 * the proxy in to action.
 */

// Parse environment config, load all .json rules, and then initiate the proxy
require('dotenv').config()
require('./lib/rules').load('rules/*.rule.json')

require('./lib/proxy').listen(
    require('./lib/config').LISTEN_PORT_HTTP
)
