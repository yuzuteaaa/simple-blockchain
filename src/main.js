const {Blockchain, Transactions} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('9d04e2a67a19bad18a429da120f5e0096bd29c6ed586afdce9e645a548918d04');
const myWalletAddress = myKey.getPublic('hex');

let tffCoin = new Blockchain();

const tx1 = new Transactions(myWalletAddress, 'Public key goes here',10);
tx1.signTransaction(myKey);
tffCoin.addTransaction(tx1);

console.log('\n Starting the miner....');
tffCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of abdul is', tffCoin.getBalanceOfAddress(myWalletAddress));

console.log(tffCoin.isChainValid());




