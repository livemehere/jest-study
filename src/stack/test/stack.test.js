const Stack = require("../stack");


describe('Stack',()=>{
    let stack;

    beforeEach(()=>{
        stack = new Stack();
    })

    it('push',()=>{
        stack.push(1);
        expect(stack.size).toBe(1);
        expect(stack.pop()).toBe(1);
    })

    it('pop should be 2',()=>{
        stack.push(1);
        stack.push(3);
        stack.push(2);
        expect(stack.pop()).toBe(2);
    })

    it('length should be 3',()=>{
        stack.push(1);
        stack.push(2);
        stack.push(4);
        stack.push(4);
        stack.push(4);
        stack.push(4);
        stack.pop();
        expect(stack.size).toBe(5);
    })

    it('length should be 0',()=>{
        expect(stack.size).toBe(0)
    })


    it('pop shuld throw error',()=>{
        expect(()=>{
            stack.pop();
        }).toThrow('stack is Empty')
    })

})
