const check = require("../check");

describe('mock',()=>{
    let onSuccess;
    let onFail;
    beforeEach(()=>{
        onSuccess = jest.fn();
        onFail = jest.fn();
    })

    it('onSucess and onFail should be call on predicate',()=>{
        check(()=> true,onSuccess,onFail);
        expect(onSuccess).toHaveReturnedTimes(1);
        expect(onSuccess).toHaveBeenCalledWith('yes');
    })

    it('should be call onFail',()=>{
        check(()=> false,onSuccess,onFail);
        expect(onFail).toHaveBeenCalledWith('no');
        expect(onFail).toHaveReturnedTimes(1);
    })

})
