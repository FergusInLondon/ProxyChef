const chef = require('cyberchef')
const logger = require('../log')

/**
 * This is an adapter around GCHQ's "CyberChef" utility;.
 * @see https://github.com/gchq/CyberChef/wiki/Node-API
 */

 /**
  * Recurse through the list of steps - or the "Dish" - specified in the rules .json
  *  file.
  * 
  * @param {chef.Dish} dish 
  * @param {[]Object} steps 
  */
function executeRecipe(dish, steps) {
    if (steps.length < 1) {
        return dish.toString()
    }

    const step = steps.shift()
    const hasOperator = Object.prototype.hasOwnProperty.call(chef, step.operation) && (
        typeof chef[step.operation] == "function"
    );

    // Function doesn't exist. Skip.
    if (!hasOperator) {
        logger.warn("skipping operator '%s'", step.operation)
        return executeRecipe(dish, steps)
    }

    return executeRecipe(
        dish.apply(chef[step.operation], step.params || {}), steps
    )
}

module.exports = {
    /**
     * Accepts the original content from the request, as well as a list of Cyberchef steps
     * to run.
     * 
     * @param {String} original 
     * @param {[]Object} steps 
     */
    evaluate(original, steps){
        let transformed = original;
    
        if ((!original || original.length < 1) ||  (!steps || steps.length < 1)) {
            return { original, transformed }
        }
    
        return {
            original,
            transformed: executeRecipe(new chef.Dish(original), steps)
        }
    }    
}
