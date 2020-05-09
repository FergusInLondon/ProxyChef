const logger = require('../log')

// Constants for all available actions
const CYBERCHEF = "cyberchef",
    RESPOND = "respond",
    SEND = "send",
    YARA = "yara",
    LOG = "log"

// All this module is used for is providing an object containing all keys and
//  associated handlers for available rules.
module.exports = {
    CYBERCHEF, YARA, LOG, RESPOND, SEND,
    handlers: {
        [CYBERCHEF]: require('./cyberchef'),
        [YARA]: {
            inbound() {
                logger.warn("yara rules aren't implemented yet")
            },
            outbound() {
                logger.warn("yara rules aren't implemented yet")        
            }
        },
        [LOG]: require('./log'),
        [RESPOND]: require('./respond'),
        [SEND]: require('./send')    
    }
}
