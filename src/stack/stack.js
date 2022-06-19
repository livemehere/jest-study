const Node = require('./node');

class Stack{
    #size;
    #head;
    constructor() {
        this.#size = 0;
        this.#head = null;
    }
    push(value){
        const node = new Node(value,this.#head);
        this.#head = node;
        this.#size++;
    }
    pop(){
        if(this.#size === 0){
            throw new Error('stack is Empty');
        }
        const result = this.#head;
        this.#head = result.prev;
        this.#size--;
        return result.value;
    }

    get size(){
        return this.#size;
    }
}

module.exports = Stack;
