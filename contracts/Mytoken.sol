// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    uint256 drip = 1 ether;

    mapping (address => uint256) public addressTime;

    constructor(string memory _name, string memory symbol) ERC20(_name, symbol) {
        _mint(msg.sender, 200 * 10 ** decimals());
    }

    function mint(address to, uint amount) public {
        _mint(to, amount);
    }

    function faucet() external {
        require(addressTime[msg.sender] < block.timestamp, "need to wait more time");
        _mint(msg.sender, drip);
        addressTime[msg.sender] = block.timestamp + 60 seconds;
    }

    function buy(uint256 _amount) public payable {
        require(msg.value > 0, 'send money');
        _mint(msg.sender, _amount);
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}