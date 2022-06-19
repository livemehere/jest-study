const ProductService = require('../product_service');
const StubProductClient = require("./stub_product_client");

describe('ProductService - Stub', ()=> {
    let productService;
    let productClient;
    beforeEach(()=>{
        productClient = new StubProductClient();
        productService = new ProductService(productClient);
    })

    it('should filtered array',async ()=>{
        const result = await productService.fetchAvailableItems();
        expect(result).toEqual([
            {item:'😍',available:true},
            {item:'🎉',available:true},
        ])
    })
});
