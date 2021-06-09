// Import web3 library to access its classes
const Web3 = require('web3');

/**
 * We are creating a new web3 instance and for this
 * exercise, we are setting the provider to local host.
 *
 * It is common to have port 8545 when using local host.
 */

const web3 = new Web3('http://localhost:8545');

const { assert, expect } = require('chai');
const EncodeCoin = require('../build/contracts/EncodeCoin.json');
const EncodeCoinAddress = '0xa3274d20cc565Ec12A5BCE78A8Ca34Fd7D6b2cE2';
const { helperAccounts } = require('./helpers');

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

    it('gets a list of available accounts', async () => {
      // accounts =
      // explore web3 to get a list of all accounts
      expect(accounts[0]).to.equal(helperAccounts[0]);
      expect(accounts[5]).to.equal(helperAccounts[5]);
      expect(accounts[9]).to.equal(helperAccounts[9]);
      expect(accounts.length).to.equal(helperAccounts.length);
    });

    it('Set the accounts addresses for the owner, alice, bob and charlie. Hint: owner account is always account[0]', async () => {
      // ownerAddress =
      // aliceAccount =
      // bobAccount =
      // charlieAccount =
      expect(ownerAddress).to.equal(helperAccounts[0]);
      expect(aliceAccount).to.equal(helperAccounts[1]);
      expect(bobAccount).to.equal(helperAccounts[2]);
      expect(charlieAccount).to.equal(helperAccounts[3]);
    });
    it('tracks the name for EncodeCoin', async () => {
      // const actual =
      const expected = 'Encode';
      expect(actual).to.equal(expected);
    });

    it('tracks the symbol for EncodeCoin', async () => {
      // const actual =
      const expected = 'ENC';
      expect(actual).to.equal(expected);
    });

    it('tracks the address for the contract owner', async () => {
      // const actual =
      expect(actual).to.equal(helperAccounts[0]);
    });

    // it('Checks the initial supply is 0', async () => {
    //   const actual = await encodeCoin.methods.totalSupply().call();
    //   expect(actual).to.equal('0');
    // });
  });
  describe('Transferring EncodeCoin', () => {
    it("Check Alice's balance", async () => {
      //  const actual =
      const expected = await encodeCoin.methods.balanceOf(aliceAccount).call();
      expect(actual).to.equal(expected);
    });
    it('Mint 100 tokens to Alice. This test checks whether it reached her account', async () => {
      const balanceBefore = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      const newTransfer = 100;
      // const actual =
      const balanceAfter = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      expect(parseInt(balanceAfter)).to.equal(
        parseInt(balanceBefore) + newTransfer
      );
    });
    it('Transfer 50 ENC to Bob. This test will check whether it reached his account', async () => {
      const balanceBefore = await encodeCoin.methods
        .balanceOf(bobAccount)
        .call();
      // const actual =
      const balanceAfter = await encodeCoin.methods
        .balanceOf(bobAccount)
        .call();
      const newTransfer = 50;
      expect(parseInt(balanceAfter)).to.equal(
        parseInt(balanceBefore) + newTransfer
      );
    });
    it("Burn 10 tokens from Alice's account", async () => {
      const balanceBefore = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      // const actual =
      const burnedAmount = 10;
      const balanceAfter = await encodeCoin.methods
        .balanceOf(aliceAccount)
        .call();
      expect(parseInt(balanceAfter)).to.equal(
        parseInt(balanceBefore) - burnedAmount
      );
    });
  });
  describe('web3.eth and web3.utils', () => {
    it("Using web3.eth, get Charlie's Ethereum balance", async () => {
      // const actual =
      const expected = parseInt(await web3.eth.getBalance(charlieAccount));
      expect(parseInt(actual)).to.equal(expected);
    });
    it('Using web3 to get an Ethereum balance returns the balance amount in wei. Using web3.utils, convert the balance from wei to Ether', async () => {
      // const actual =
      const expected = await web3.utils.fromWei(
        await web3.eth.getBalance(charlieAccount),
        'ether'
      );
      expect(actual).to.equal(expected);
    });
    it('Web3 can also estimate the gas for a transaction. Explore the library to see how much gas it would cost Bob to send Charlie 1 Ether', async () => {
      // const actual =
      const expected = 53000;
      expect(actual).to.equal(expected);
    });
    it("Web3js can calculate the keccack256 an input. Try using utils to calculate the keccak256 for the string 'Ethereum'", async () => {
      const string = 'Ethereum';
      // const actual =
      const expected =
        '0x564ccaf7594d66b1eaaea24fe01f0585bf52ee70852af4eac0cc4b04711cd0e2';
      expect(actual).to.equal(expected);
    });
    it("There's also a method to calculate the sha3 of a string input, use utils to calculate the sha3 of the same string", async () => {
      const string = 'Ethereum';
      // const actual =
      const expected =
        '0x564ccaf7594d66b1eaaea24fe01f0585bf52ee70852af4eac0cc4b04711cd0e2';
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
 * How to make the tests robust enough so that it works for everyone.
 */
