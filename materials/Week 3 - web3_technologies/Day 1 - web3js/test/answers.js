const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const EncodeCoin = require('../build/contracts/EncodeCoin.json');
const EncodeCoinAddress = '0xD1dbEd320af505245942e13Aa08bbc180457f822';

// let encodeCoin;
// let accounts;
// let ownerAddress;
// let bobAccount;
// let charlieAccount;
// let expectedBalanceAlice;

// beforeEach(async () => {
//   encodeCoin = await new web3.eth.Contract(EncodeCoin.abi, EncodeCoinAddress);
// });

const helperAccounts = [
  '0x577CfAC6Accd066BE1EEC73cF515FEAd3C71ef3f',
  '0x7182Bd4Bc30a7AD7f049385aEEC927D1e64B31CC',
  '0xb7960A6595cdcFA679e22E5877BA6b98d84eA8b4',
  '0xA894d630C892265E97EB99fc56b702248eEfDD87',
  '0xa3A9624Fa2C350C28e738DE4D377fB4B151816F4',
  '0x2542671CB79e6c9517aC604Ef6F91426412bE350',
  '0x189B19bc36BEb12a7468f8d02a86c3090f30DBa8',
  '0x17FA2Fc714520152B5fd8CFB0E7876B38b584aAf',
  '0xeD47dFD990dF3eD587db90Ab1322565874721e18',
  '0xd8182b4cAEd67DdEdb4a43e92c2FFBDbb7A5C225',
];

let aliceAccount = helperAccounts[1];
let charlieAccount = helperAccounts[3];

async function getContract() {
  const encodeCoin = await new web3.eth.Contract(
    EncodeCoin.abi,
    EncodeCoinAddress
  );
  return encodeCoin;
}

async function getAlicesBalance() {
  const encodeCoin = await getContract();
  const balance = await encodeCoin.methods.balanceOf(aliceAccount).call();
  return balance;
}

async function getTotalVotes() {
  const encodeCoin = await getContract();
  const total = await encodeCoin.methods.tokenVotes().call();
  return total;
}

async function getCharlieBalance() {
  return parseInt(await web3.eth.getBalance(charlieAccount));
}

async function getBalanceInEther() {
  return await web3.utils.fromWei(
    await web3.eth.getBalance(charlieAccount),
    'ether'
  );
}

const expectedHash =
  '0x564ccaf7594d66b1eaaea24fe01f0585bf52ee70852af4eac0cc4b04711cd0e2';

module.exports = {
  helperAccounts,
  expectedHash,
  getAlicesBalance,
  getTotalVotes,
  getCharlieBalance,
  getBalanceInEther,
};
