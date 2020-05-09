const assert = require('assert')
const {readResource, validActions} = require('./util')

describe('[util.js] Utilities', () => {
    describe('readResource', () => {
        it('should return the entirety of a stream', async () => {
            const stream = new require('stream').Readable()

            stream.push("hello")
            stream.push(" w")
            stream.push("orld")
            stream.push(null)

            assert.equal(await readResource(stream), "hello world")
        })
    })

    describe('validActions', () => {
        it('should return intersect between two objects', () => {
            assert.deepEqual(
                validActions({ cyberchef: null,  testing: null,  dump: null, response: null, send: null }),
                ["cyberchef", "send"]
            )
        })

        it('should handle empty input', () => {
            assert.deepEqual( validActions({}), [])
        })
    })
})
