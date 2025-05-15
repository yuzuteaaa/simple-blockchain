const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, '10/01/2025', 'Genesis Block','0');
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let hcoin = new Blockchain();
hcoin.addBlock(new Block(1,'11/01/2025', {amount: 4}));
hcoin.addBlock(new Block(2,'13/01/2025', {amount: 9}));

console.log('Is blockchain valid ?' + hcoin.isChainValid());

hcoin.chain[1].data = {amount: 400};
hcoin.chain[1].hash = hcoin.chain[1].calculateHash();

console.log('Is blockchain valid ?' + hcoin.isChainValid());

// console.log(JSON.stringify(hcoin, null, 10));