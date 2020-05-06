const chef = require('cyberchef')
const logger = require('./log')

/**
 * This is an adapter around GCHQ's "CyberChef" utility; it's essentially
 *  the brains behind the proxy - allowing automatic parsing of matched
 *  requests.
 * 
 * The CyberChef module follows a common pattern, whereby operations are
 * 
 * // [method(input, args)]
 * 
 * 
 * 
 * @see https://github.com/gchq/CyberChef/wiki/Node-API
 */

function executeRecipe(dish, steps) {
    if (steps.length < 1) {
        return dish.toString()
    }

    step = steps.shift()
    const hasOperator = chef.hasOwnProperty(step.operation) && (
        typeof chef[step.operation] == "function"
    );

    // Function doesn't exist. Skip.
    if (!hasOperator) {
        logger.warn("skipping operator '%s'", step.operation)
        return executeRecipe(dish, steps)
    }

    const operation = chef[step.operation]
    const arguments = step.params || {}

    return executeRecipe(
        dish.apply(operation, arguments), steps
    )
}

module.exports = {
    evaluate(original, recipe){
        let transformed = original;

        if ((!original || original.length < 1) ||  (!recipe.steps || recipe.steps.length < 1)) {
            return { original, transformed }
        }
    
        return {
            original,
            transformed: executeRecipe(new chef.Dish(original), recipe.steps)
        }
    }
}
