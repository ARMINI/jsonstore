const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require ('../compile.js');


let accounts;
let jsonstore;
const test = '{ "name":"John", "age":31, "city":"New York" }';
beforeEach(async () => {
    
    accounts = await web3.eth.getAccounts();
        
    jsonstore = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['{ "name":"John", "age":31, "city":"New York" }']})
    .send({ from: accounts[0], gas:'1000000' });

});

describe('JsonStore', () => {
    it('deploys a contrac', () => {
       //console.log(jsonstore.options);
        assert.ok(jsonstore.options.address);
    });

   
    it('imprimir un JSON', async () =>{
        msg = await jsonstore.methods.set(test).send({ from: accounts[0] });
        const transaction = await web3.eth.getTransaction(msg.transactionHash);
        const input = web3.utils.hexToUtf8(transaction.input);
        console.log(input);
    });
});