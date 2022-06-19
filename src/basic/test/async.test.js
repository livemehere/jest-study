const fetchProduct = require("../async");

describe('Async',()=>{

    it('async done',(done)=>{
        fetchProduct().then(result=>{
            expect(result).toEqual({name:'kong',job:'FE developer'})
            done();
        })
    })

    it('async return',()=>{
        return fetchProduct().then(result=>{
            expect(result).toEqual({name:'kong',job:'FE developer'})
        })
    })

    it('async await',async ()=>{
        const result = await fetchProduct();
        expect(result).toEqual({name:'kong',job:'FE developer'})
    })

    it('async resolves',()=>{
        return expect(fetchProduct()).resolves.toEqual({name:'kong',job:'FE developer'})
    })

    it('async rejects',()=>{
        return expect(fetchProduct('error')).rejects.toBe('network error')
    })

})
