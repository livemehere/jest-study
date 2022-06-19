class Node{
    #value;
    #prev;
    constructor(value,prev) {
        this.#value = value;
        this.#prev = prev;
    }

    get value(){
        return this.#value;
    }

    get prev(){
        return this.#prev;
    }

}

module.exports = Node;

