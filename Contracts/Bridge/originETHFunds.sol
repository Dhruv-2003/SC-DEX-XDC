// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// deposit  -- by anyone
/// withdraw -- onlybridge

import "@openzeppelin/contracts/access/Ownable.sol";

contract originETHFunds {
    address public approved;

    mapping(address => uint256) public deposited;

    event Deposit(address user, uint256 amount);
    event Withdraw(address user, uint256 amount);

    constructor(address bridge) {
        approved = bridge;
    }

    modifier onlyApproved() {
        require(msg.sender == approved, "Not Authorised");
        _;
    }

    function deposit(uint256 amount, address user) public payable {
        require(msg.value == amount, "Amount is not Correct");
        deposited[user] += amount;
        emit Deposit(user, amount);
    }

    function withdraw(address user, uint256 amount) public onlyApproved {
        (bool success, ) = user.call{value: amount}();
        require(success, "Transfer Not complete");
        deposited[user] -= amount;
        emit Withdraw(user, amount);
    }

    ///No Fallback so no ETH can be recieved directly

    function setApproved(address _approved) public onlyOwner {
        approved = _approved;
    }
}
