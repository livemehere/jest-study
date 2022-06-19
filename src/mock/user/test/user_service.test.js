const UserService = require('../user_service');
const UserClient = require('../user_client');

jest.mock('../user_client');

describe('UserService',()=>{
    let userSerice;
    let userClient;

    const login = jest.fn(async ()=>{
        return {
            id:'kong',
            password:'1234',
            role:'admin'
        }
    })

    UserClient.mockImplementation(()=>{
        return {
            login
        }
    })

    beforeEach(()=>{
        userClient = new UserClient()
        userSerice = new UserService(userClient);
    })

    it('isLogedIn should be true',async ()=>{
        await userSerice.login('kong','1234');
        expect(userSerice.isLogedIn).toBe(true)
    })

})
