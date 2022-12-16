// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../Core/interfaces/ILendingPool.sol";
import "../Core/interfaces/ILendingPoolFactory.sol";
import "../Other/interfaces/IERC20.sol";
import "../Other/interfaces/IXDC.sol";
import "./libraries/TransferHelper.sol";

// deposit
// withdraw
// borrow
// repay
// Fetch details of the pool - like Pool address ,

// get details for the user

contract LendingPoolRouter {
    address public immutable factory;
    address public immutable WEXDC;

    constructor(address _factory, address xdcWrapper) {
        factory = _factory;
        WEXDC = xdcWrapper;
    }

    function getPoolAddress(address token) public view returns (address pool) {
        pool = ILendingPoolFactory(factory).getPool(token);
    }

    function getBalance(address token) public view returns (uint256 balance) {
        balance = IERC20(token).balanceOf(msg.sender);
    }

    function createPool(address token) public {
        ILendingPoolFactory(factory).createPool(token);
    }

    /// user SafeApprove , SafeTransfer , SafeTransferFrom from Transfer Helper

    function depositToken(address token, uint256 amount) public {
        address pool = getPoolAddress(token);

        if (pool != address(0)) {
            /// Not sure of Approval
            // TransferHelper.safeApprove(token, pool, amount);

            ILendingPool(pool).deposit(amount);
        } else {
            createPool(token);
            pool = getPoolAddress(token);
            ILendingPool(pool).deposit(amount);
        }
    }

    function withdrawToken(address token) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        require(
            ILendingPool(pool).lendAmount(msg.sender).amount > 0,
            "No amount to withdraw"
        );
        ILendingPool(pool).withdraw();
    }

    function borrowToken(address token, uint256 amount) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        ILendingPool(pool).borrow(amount);
    }

    function repayToken(address token) public {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        /// amount is not correct most probably
        uint256 amount = ILendingPool(pool).borrowAmount(msg.sender).amount;

        require(amount > 0, "No Amount to repay");
        // TransferHelper.safeApprove(token, pool, amount * 2);

        ILendingPool(pool).repay();
    }

    function depositETH(uint256 amount) public payable {
        require(amount == msg.value, "Incorrect Amount");

        address pool = getPoolAddress(WEXDC);

        ///  XDC Wrapped and sent to the User
        IXDC(WEXDC).deposit{value: msg.value}();
        TransferHelper.safeTransfer(WEXDC, msg.sender, msg.value);

        if (pool != address(0)) {
            /// Not sure of Approval
            // TransferHelper.safeApprove(token, pool, amount);

            ILendingPool(pool).deposit(amount);
        } else {
            createPool(WEXDC);
            pool = getPoolAddress(WEXDC);
            ILendingPool(pool).deposit(amount);
        }
    }

    function withdrawETH() public {
        address pool = getPoolAddress(WEXDC);
        require(pool != address(0), "Pool Does not exists");
        uint256 amount = ILendingPool(pool).lendAmount(msg.sender).amount;

        require(amount > 0, "No amount to withdraw");

        ILendingPool(pool).withdraw();
        IXDC(WEXDC).transferFrom(msg.sender, address(this), amount);

        IXDC(WEXDC).withdraw(amount);

        TransferHelper.safeTransferETH(msg.sender, amount);
    }

    function borrowETH(uint256 amount) public {
        address pool = getPoolAddress(WEXDC);
        require(pool != address(0), "Pool Does not exists");

        ILendingPool(pool).borrow(amount);

        IXDC(WEXDC).transferFrom(msg.sender, address(this), amount);

        IXDC(WEXDC).withdraw(amount);

        TransferHelper.safeTransferETH(msg.sender, amount);
    }

    function repayETH() public payable {
        address pool = getPoolAddress(WEXDC);
        require(pool != address(0), "Pool Does not exists");
        uint256 amount = ILendingPool(pool).borrowAmount(msg.sender).amount;

        require(amount > 0, "No Amount to repay");

        require(msg.value == amount, "Incorrect amount sent");

        IXDC(WEXDC).deposit{value: msg.value}();
        TransferHelper.safeTransfer(WEXDC, msg.sender, msg.value);

        ILendingPool(pool).repay();
    }

    function getLendAmount(address token, address user)
        public
        view
        returns (uint256 amount)
    {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        amount = ILendingPool(pool).lendAmount(user).amount;
    }

    function getBorrowAmount(address token, address user)
        public
        view
        returns (uint256 amount)
    {
        address pool = getPoolAddress(token);
        require(pool != address(0), "Pool Does not exists");

        amount = ILendingPool(pool).borrowAmount(user).amount;
    }
}
