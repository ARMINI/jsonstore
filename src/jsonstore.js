import web3 from './web3';

const address = '0xe34a1F64C3100ee847844AA8639EF1a6a1C87d4f';

const abi = [{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

export default new web3.eth.Contract(abi, address);