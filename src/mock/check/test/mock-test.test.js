describe('mock test',()=>{
    let fetchItems = jest.fn(async()=>{
        return [
            {item:'😍',available:true},
            {item:'🚀',available:false},
            {item:'🎉',available:true},
        ]
    })
    it('return array',async ()=>{
        const result = await fetchItems();
        expect(result).toEqual([
            {item:'😍',available:true},
            {item:'🚀',available:false},
            {item:'🎉',available:true},
        ])
    })
})
