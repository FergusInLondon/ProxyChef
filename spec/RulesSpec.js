describe("rules", () => {
    const { evaluate } = require('../lib/rules')

    //
    it("should handle empty input and recipes", () => {
        const applied = evaluate("", {})

        expect(applied.original).toBe("")
        expect(applied.transformed).toBe(applied.original)
    })

    // 
    it("should handle operations which don't exist", () => {
        const applied = evaluate("teststring", {
            steps: [
                {
                    operation: "doesntExist"
                }
            ]
        })

        expect(applied.original).toBe("teststring")
        expect(applied.transformed).toBe(applied.original)
    })

    //
    it("should return both the initial content and the transformed content", () => {
        const applied = evaluate("encodeMe!", {
            steps: [
                {
                    operation: "toBase64"
                }
            ]
        })

        expect(applied.original).toBe("encodeMe!")
        expect(applied.transformed).toBe(Buffer.from("encodeMe!").toString("base64"))
    })

    // should pass params
    it("should pass parameters to underlying cyberchef instance", () => {
        const applied = evaluate("Service!", {
            steps: [
                {
                    operation: "toCharcode",
                    params: {
                        base: 8
                    }
                }
            ]
        })

        expect(applied.original).toBe("Service!")
        expect(applied.transformed).toBe("123 145 162 166 151 143 145 41")
    })

    //
    it("should execute steps in sequential order", () => {
        const applied = evaluate("Chainable!", {
            steps: [
                {   operation: "toBase64"   },
                {   operation: "toCharcode" }
            ]
        })

        expect(applied.original).toBe("Chainable!")
        expect(applied.transformed).toBe("51 32 68 68 61 57 35 68 59 6d 78 6c 49 51 3d 3d")
    })
})
