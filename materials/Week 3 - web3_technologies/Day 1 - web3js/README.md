# Web3js

## Introduction

In this exercise, you will be exploring some of the commonly used methods in the web3js library. By the end of the exercise, you should feel familiar with:

- Getting web3 accounts
- Call and send methods from the contract
- Making transactions from one account to another
- Minting and burning tokens
- Functions derived from Open Zeppelin's ERC20 contract
- Methods for getting public variables
- Using web3.eth and web3.utils

You will be exploring web3js for a ERC20 EncodeCoin contract that we can compiled and deployed for you.

We have written tests for you so that you can check whether the method called is correct. You can check your tests by running `truffle test test/encodecoin.test.js` in command line.

## Exercise: EncodeCoin

We have created a contract called EncodeCoin. It's an ERC20 token that allows the owner to mint tokens, burn tokens and send tokens to recipients. Recipients can send tokens to others. EncodeCoin also allows users to vote for its coin.

To help you complete the tasks, we recommend that you:

1. Explore EncodeCoin.sol in the contracts folder,
2. Deploy the contract in Remix to view the functions available,
3. web3js documentation at https://web3js.readthedocs.io/en/v1.2.11/web3.html, and
4. If you wish, you could also explore Open Zeppelin's ERC20 contract https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol

An instance of the contract has been created for you. To run your tests, run `truffle test test/encodecoin.test.js` in the command line.

There are plenty of tests to complete, however there's no requirement for you to complete it within the hour. You may wish to revisit the tests in the future.

Some of the answers are in `answers.js`. We recommend that you try and answer the test without looking.
