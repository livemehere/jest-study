const Calculator = require("../calculator");

describe('Calculator',()=>{
    let calculator;
    beforeEach(()=>{
        calculator = new Calculator();
    })

    it('inits with 0',()=>{
        calculator.set(0);
        expect(calculator.value).toBe(0);
    })

    it('clear to 0',()=>{
        calculator.set(10)
        calculator.clear();
        expect(calculator.value).toBe(0);
    })

    it('add',()=>{
        calculator.set(99);
        calculator.add(1);
        expect(calculator.value).toBe(100)
    })

    it('add throw Error when value is greater than 100',()=>{
        expect(()=>{
            calculator.set(0);
            calculator.add(101);
        }).toThrow('Value can not be greater than 100')
    })

    it('subtract',()=>{
        calculator.set(11);
        calculator.subtract(1);
        expect(calculator.value).toBe(10)
    })
    it('multiply',()=>{
        calculator.set(11);
        calculator.multiply(2);
        expect(calculator.value).toBe(22)
    })


    describe('divides',()=>{
        it('0 / 0 === NaN',()=>{
            calculator.set(0);
            calculator.divide(0);
            expect(calculator.value).toBe(NaN);
        })
        it('1 / 0 === Infinity',()=>{
            calculator.set(1);
            calculator.divide(0);
            expect(calculator.value).toBe(Infinity);
        })
        it('4 / 4 === 1',()=>{
            calculator.set(4);
            calculator.divide(4);
            expect(calculator.value).toBe(1);
        })
    })
})
