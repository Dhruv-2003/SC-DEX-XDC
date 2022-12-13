// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./libraries/XSwapLibrary.sol";
import "../Core/interfaces/IXSwapPair.sol";

contract XSwapPriceOracle {
    address public immutable override factory;
    address public immutable override WETH;

    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }

    /// returns the price of A with respect to B
    /// 1 A = price * ( B )
    function getPriceA(address tokenA, address tokenB)
        public
        returns (uint256 priceA)
    {
        address pair = XSwapLibrary.pairFor(factory, tokenA, tokenB);
        priceA = IXSwapPair(pair).price0CumulativeLast();
    }

    function getPriceB(address tokenA, address tokenB)
        public
        returns (uint256 priceB)
    {
        address pair = XSwapLibrary.pairFor(factory, tokenA, tokenB);
        priceB = IXSwapPair(pair).price1CumulativeLast();
    }
}
