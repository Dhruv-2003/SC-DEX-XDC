// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract IXSwapERC20 {
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    function _mint(address to, uint256 value) internal {}

    function _burn(address from, uint256 value) internal {}

    function _approve(
        address owner,
        address spender,
        uint256 value
    ) private {}

    function _transfer(
        address from,
        address to,
        uint256 value
    ) private {}

    function approve(address spender, uint256 value) external returns (bool) {}

    function transfer(address to, uint256 value) external returns (bool) {}

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool) {}
}
