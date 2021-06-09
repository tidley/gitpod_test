const Web3 = require('web3');

/**
 * We are creating a new web3 instance from the import
 * and for this exercise, we are setting the provider
 * to local host.
 *
 * It is common to have port 8545 when using local host.
 */

const web3 = new Web3('http://localhost:8545'); // think about where to deploy. Rinkeby, adding URL from Infura. Getting testnet tokens from faucet.

const { assert, expect } = require('chai');
const EncodeCoin = require('../build/contracts/EncodeCoin.json');
const EncodeCoinAddress = '0xD1dbEd320af505245942e13Aa08bbc180457f822';
const {
  helperAccounts,
  expectedHash,
  getAlicesBalance,
  getTotalVotes,
  getCharlieBalance,
  getBalanceInEther,
} = require('./answers');

let encodeCoin;
let accounts;
let ownerAddress;
let aliceAccount;
let bobAccount;
let charlieAccount;

describe('EncodeCoin', () => {
  beforeEach(async () => {
    /**
     * We are creating a new instance of the contract
     * so that we can access the contract methods, use web3js utils etc
     */
    encodeCoin = await new web3.eth.Contract(EncodeCoin.abi, EncodeCoinAddress);
  });

  describe('Deploying the contract', () => {
    it('creates a new instance of the contract', async () => {
      assert.ok(encodeCoin._address);
    });

    // Start answering the tests from here

    it('Explore web3 to get a list of available accounts', async () => {
      accounts = await web3.eth.getAccounts();
      // explore web3 to get a list of all accounts
      expect(accounts[0]).to.equal(helperAccounts[0]);
      expect(accounts[5]).to.equal(helperAccounts[5]);
      expect(accounts[9]).to.equal(helperAccounts[9]);
      expect(accounts.length).to.equal(helperAccounts.length);
    });

    it('Set the accounts addresses for the owner, alice, bob and charlie. Hint: owner account is always account[0]', async () => {
      ownerAddress = accounts[0];
      aliceAccount = accounts[1];
      bobAccount = accounts[2];
      charlieAccount = accounts[3];
      expect(ownerAddress).to.equal(helperAccounts[0]);
      expect(aliceAccount).to.equal(helperAccounts[1]);
      expect(bobAccount).to.equal(helperAccounts[2]);
      expect(charlieAccount).to.equal(helperAccounts[3]);
    });
    it('Get the name for the EncodeCoin contract', async () => {
      const actual = await encodeCoin.methods.name().call();
      const expected = 'Encode';
      expect(actual).to.equal(expected);
    });

    it('Get the symbol for the contract', async () => {
      const actual = await encodeCoin.methods.symbol().call();
      const expected = 'ENC';
      expect(actual).to.equal(expected);
    });

    it('Get the address for the contract owner', async () => {
      const actual = await encodeCoin.methods.owner().call();
      expect(actual).to.equal(helperAccounts[0]);
    });

    // it('Checks the initial supply is 0', async () => {
    //   const actual = await encodeCoin.methods.totalSupply().call();
    //   expect(actual).to.equal('0');
    // });
  });

  describe('Minting, burning, and transferring EncodeCoin', () => {
    it("Explore the contract's methods to get Alice's balance", async () => {
      const actual = await encodeCoin.methods.balanceOf(aliceAccount).call();
      const expected = await getAlicesBalance();
      expect(actual).to.equal(expected);
    });
    it('Mint 100 ENC to Alice. This test checks whether it reached her account', async () => {
      const balanceBefore = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      const newTransfer = 100;
      const actual = await encodeCoin.methods
        .mintToken(aliceAccount, 100)
        .send({ from: ownerAddress });
      const balanceAfter = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      expect(parseInt(balanceAfter)).to.equal(
        parseInt(balanceBefore) + newTransfer
      );
    });
    it('Transfer 10 ENC to Bob. This test checks whether it reached his account', async () => {
      const balanceBefore = await encodeCoin.methods
        .balanceOf(bobAccount)
        .call();
      const actual = await encodeCoin.methods
        .transfer(bobAccount, 10)
        .send({ from: aliceAccount });
      const balanceAfter = await encodeCoin.methods
        .balanceOf(bobAccount)
        .call();
      const newTransfer = 10;
      expect(parseInt(balanceAfter)).to.equal(
        parseInt(balanceBefore) + newTransfer
      );
    });
    it("Burn 10 tokens from Alice's account", async () => {
      const balanceBefore = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      const actual = await encodeCoin.methods
        .burnToken(aliceAccount, 10)
        .send({ from: ownerAddress });
      const burnedAmount = 10;
      const balanceAfter = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      expect(parseInt(balanceAfter)).to.equal(
        parseInt(balanceBefore) - burnedAmount
      );
    });
  });
  describe('Other contract methods', async () => {
    it('Look at the other methods available and return how many users have voted for EncodeCoin', async () => {
      const actual = await encodeCoin.methods.tokenVotes().call();
      const expected = await getTotalVotes();
      expect(actual).to.equal(expected);
    });
    it('Use the methods to vote for EncodeCoin', async () => {
      const totalVotesBefore = await getTotalVotes();
      const newVote = 1;
      const actual = await encodeCoin.methods
        .vote()
        .send({ from: aliceAccount });
      const totalVotesAfter = await getTotalVotes();
      const expected = parseInt(totalVotesBefore) + parseInt(newVote);
      expect(totalVotesAfter).to.equal(expected.toString());
    });
  });

  describe('web3.eth and web3.utils', () => {
    it("Using web3.eth, get Charlie's Ethereum balance", async () => {
      const actual = await web3.eth.getBalance(charlieAccount);
      const expected = await getCharlieBalance();
      expect(parseInt(actual)).to.equal(expected);
    });
    it('Using web3 to get an Ethereum balance returns the balance amount in wei. Using web3.utils, convert the balance from wei to Ether', async () => {
      const actual = await web3.utils.fromWei(
        await web3.eth.getBalance(charlieAccount),
        'ether'
      );
      const expected = await getBalanceInEther();
      expect(actual).to.equal(expected);
    });
    it('Web3 can also estimate the gas for a transaction. Explore the library to see how much gas it would cost Bob to send Charlie 1 ETH', async () => {
      const actual = await web3.eth.estimateGas({
        from: bobAccount,
        to: charlieAccount,
        value: await web3.utils.toWei('1', 'ether'),
      });
      const expected = 21000;
      expect(actual).to.equal(expected);
    });
    it("Web3js can calculate the keccack256 an input. Try using utils to calculate the keccak256 for the string 'Ethereum'", async () => {
      const string = 'Ethereum';
      const actual = await web3.utils.keccak256(string);
      const expected = expectedHash;
      expect(actual).to.equal(expected);
    });
    it("There's also a method to calculate the sha3 of a string input, calculate the sha3 of the same string", async () => {
      const string = 'Ethereum';
      const actual = await web3.utils.sha3(string);
      const expected = expectedHash;
      expect(actual).to.equal(expected);
    });
  });
});

/**
 * ISSUE
 *
 * This would be good but if everyone is working on the same contract, there's a possibility that we could run into problems??
 *
 * i.e
 *
 *
 * How to make the tests robust enough so that it works for everyone.
 *
 * We could provide instructions in the README for them to deploy their own contract. This would prevent the possibility of unforeseen issues.
 *
 * If we deploy the contract on Rinkeby, it doesn't provide a list of test accounts. We would have to change the test for web3.eth.getAccounts() and provide the accounts with test ether.
 *
 */
