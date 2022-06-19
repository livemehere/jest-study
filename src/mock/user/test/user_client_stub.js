class StubUserClient {
    async login(id, password) {
        return {
            id:'kong',
            password:'1234',
            role:'admin'
        }
    }
}

module.exports = StubUserClient;
