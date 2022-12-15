// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../Core/interfaces/ILendingPool.sol";
import "../Core/interfaces/ILendingPoolFactory.sol";

// deposit
// withdraw
// borrow
// repay
// Fetch details of the pool - like Pool address ,

// get details for the user

contract LendingPoolRouter {
    address public immutable factory;

    constructor(address _factory) {
        factory = _factory;
    }
}
