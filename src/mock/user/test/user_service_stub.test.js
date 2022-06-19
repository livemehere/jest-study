const UserService = require('../user_service');
const UserClient = require('./user_client_stub');

describe('UserService',()=>{
    let userSerice;
    let userClient;

    beforeEach(()=>{
        userClient = new UserClient()
        userSerice = new UserService(userClient);
    })

    it('isLogedIn should be true',async ()=>{
        await userSerice.login('kong','1234');
        expect(userSerice.userInfo).toEqual({
            id:'kong',
            password:'1234',
            role:'admin'
        })
        expect(userSerice.isLogedIn).toBe(true)
    })

})
