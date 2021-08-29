const rewire = require("rewire")
const auth = rewire("./auth")
const getToken = auth.__get__("getToken")
const getData = auth.__get__("getData")
// @ponicode
describe("getToken", () => {
    test("0", () => {
        let callFunction = () => {
            getToken()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getData", () => {
    test("0", () => {
        let callFunction = () => {
            getData()
        }
    
        expect(callFunction).not.toThrow()
    })
})
