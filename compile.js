const path = require ('path');
const fs = require ('fs');
const solc = require('solc');

const jsonStorePath = path.resolve(__dirname, 'contracts', 'JsonStore.sol' );
const source = fs.readFileSync(jsonStorePath, 'utf8');


module.exports = solc.compile(source,1).contracts[':JsonStore'];
//console.log(solc.compile(source,1));