const assert = require('assert')
const { evaluate } = require('./cyberchef')

describe('[cyberchef.js] Utilities', () => {
    describe('evaluate', () => {
        it('should handle empty input', async () => {
            const applied = evaluate("", [])
            assert.equal(applied.original, "")
            assert.equal(applied.transformed, applied.original)
        })

        it('should handle operations which don\'t exist', async () => {
            const applied = evaluate("teststring", [
                    {
                        operation: "doesntExist"
                    }
                ])
    
            assert.equal(applied.original, "teststring")
            assert.equal(applied.transformed, applied.original)
        })

        it('should return both initial content and transformed content', () => {
            const applied = evaluate("encodeMe!", [
                    {
                        operation: "toBase64"
                    }
                ])
    
            assert.equal(applied.original, "encodeMe!")
            assert.equal(applied.transformed, Buffer.from("encodeMe!").toString("base64"))            
        })

        it('should pass parameters to the underlying cyberchef instance', () => {
            const applied = evaluate("Service!", [
                    {
                        operation: "toCharcode",
                        params: {
                            base: 8
                        }
                    }
                ])
    
            assert.equal(applied.original, "Service!")
            assert.equal(applied.transformed, "123 145 162 166 151 143 145 41")
        })

        it('should execute steps in a sequential order', () => {
            const applied = evaluate("Chainable!", [
                    {   operation: "toBase64"   },
                    {   operation: "toCharcode" }
                ])
    
            assert.equal(applied.original, "Chainable!")
            assert.equal(applied.transformed, "51 32 68 68 61 57 35 68 59 6d 78 6c 49 51 3d 3d")
        })
    })
})

