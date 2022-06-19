function fetchProduct(error){
    if(error === 'error'){
        return Promise.reject('network error');
    }

    return Promise.resolve({name:'kong',job:'FE developer'})
}

module.exports = fetchProduct;
