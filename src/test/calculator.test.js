const Calculator = require("../calculator");


test('caculator',()=>{
    const calculator = new Calculator();
    calculator.set(0);
    expect(calculator.value).toBe(0);

})
