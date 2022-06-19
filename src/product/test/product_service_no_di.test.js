const ProductService = require('../product_service_no_di.js');
const ProductClient = require('../product_client.js');

jest.mock('../product_client');

describe('ProductService',()=>{
    const fetchItems = jest.fn(async()=>{
        return [
            {item:'😍',available:true},
            {item:'🚀',available:false},
            {item:'🎉',available:true},
        ]
    });

    ProductClient.mockImplementation(()=>{
        return{
            fetchItems
        }
    })

    let productService;
    beforeEach(()=>{
        productService = new ProductService();
    })

    it('should return array',async()=>{
        const result = await productService.fetchAvailableItems();
        expect(result).toEqual([
            {item:'😍',available:true},
            {item:'🎉',available:true},
        ]);
    })
})
