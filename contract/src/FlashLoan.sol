// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "forge-std/Test.sol";

import {AaveInterface} from "./interfaces/AaveInterface.sol";
import {ERC20Interface} from "./interfaces/ERC20Interface.sol";
import {NftfiInterface} from "./interfaces/NftfiInterface.sol";
import "uniswap-v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract FlashLoan is Test {
    uint256 public number;
    AaveInterface public aave;
    NftfiInterface public nftfi;

    constructor() {
        aave = AaveInterface(0x7b5C526B7F8dfdff278b4a3e045083FBA4028790); // goerli
        nftfi = NftfiInterface(0x77097f421CEb2454eB5F77898d25159ff3C7381d);
    }

    function getCurrentFee() external view returns (uint128) {
        return aave.FLASHLOAN_PREMIUM_TOTAL();
    }

    function flashloan(address asset, uint256 amount) external {
        aave.flashLoanSimple(address(this), asset, amount, "", 0);
    }

    function executeOperation(address asset, uint256 amount, uint256 premium, address, bytes calldata)
        external
        returns (bool)
    {
        uint256 amountOwed = amount + premium;
        // console.log("amount owned %s and premium %s", amountOwed, premium);
        ERC20Interface(asset).approve(address(aave), amountOwed);

        // We should have 1005 weth.
        // uint256 wethBalance = ERC20Interface(asset).balanceOf(address(this));
        // require(wethBalance == 2000 ether, "flashloan didn't work");

        // Logic ...
        ///

        return true;
    }

    function approve(address token) external {
        ERC20Interface(token).approve(address(aave), type(uint256).max);
    }

    address private uniswapV2RouterAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D; //goerli, mainnet same
    IUniswapV2Router02 private uniswapV2Router = IUniswapV2Router02(uniswapV2RouterAddress);

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint256 _amountADesired,
        uint256 _amountBDesired,
        uint256 _amountAMin,
        uint256 _amountBMin,
        address _to,
        uint256 _deadline
    ) external returns (uint256, uint256, uint256) {
        // First approve Router to spend tokens
        ERC20Interface(_tokenA).approve(uniswapV2RouterAddress, _amountADesired);
        ERC20Interface(_tokenB).approve(uniswapV2RouterAddress, _amountBDesired);

        // Add liquidity
        (uint256 amountA, uint256 amountB, uint256 liquidity) = uniswapV2Router.addLiquidity(
            _tokenA, _tokenB, _amountADesired, _amountBDesired, _amountAMin, _amountBMin, _to, _deadline
        );
        return (amountA, amountB, liquidity);
    }

    function swapTokens(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to,
        uint256 _deadline
    ) external returns (uint256[] memory amounts) {
        // First approve Router to spend _tokenIn
        ERC20Interface(_tokenIn).approve(uniswapV2RouterAddress, _amountIn);

        address[] memory path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;

        // Make the swap
        amounts = uniswapV2Router.swapExactTokensForTokens(_amountIn, _amountOutMin, path, _to, _deadline);

        return amounts;
    }

    // Add a function to call the payBackLoan function in the external contract
    function payBackLoan(uint32 _loanId) public {
        address NFTFI_ALLOW = 0x77097f421CEb2454eB5F77898d25159ff3C7381d;
        address WETH = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
        console.log("balance repay %s", ERC20Interface(WETH).balanceOf(address(this)));
        console.log("account flashloan %s", address(this));

        ERC20Interface(WETH).approve(NFTFI_ALLOW, type(uint256).max);

        nftfi.payBackLoan(_loanId);
        bool isRepaidOrLiquidated = nftfi.loanRepaidOrLiquidated(_loanId);
        console.log("isRepaidOrLiquidated %s", isRepaidOrLiquidated);
        require(isRepaidOrLiquidated, "Loan not repaid or liquidated");
    }
}
