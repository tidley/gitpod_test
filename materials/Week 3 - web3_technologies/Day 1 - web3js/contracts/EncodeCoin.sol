// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EncodeCoin is ERC20("Encode", "ENC"), Ownable {
    constructor() {}

    int256 public tokenVotes = 0;

    // mapping(address => uint256) public transfersLeaderboard;

    function mintToken(address _recipient, uint256 _amount) public onlyOwner {
        _mint(_recipient, _amount);
    }

    // function transferEnc(address _recipient, uint256 _amount) public {
    //     transfer(_recipient, _amount);
    //     transfersLeaderboard[msg.sender] ++;
    // }

    function vote() public {
        tokenVotes++;
    }

    function burnToken(address _recipient, uint256 _amount) public onlyOwner {
        _burn(_recipient, _amount);
    }
}
