// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface ILendingPool {
    struct Amount {
        uint256 amount;
        uint256 start;
    }

    function lendAmount(address user) external view returns (Amount memory);

    function borrowAmount(address user) external view returns (Amount memory);

    function lenders(address user) external view returns (bool);

    function borrowers(address user) external view returns (bool);

    function deposit(uint256 _amount) external;

    function borrow(uint256 _amount) external;

    function repay() external;

    function withdraw() external;
}
