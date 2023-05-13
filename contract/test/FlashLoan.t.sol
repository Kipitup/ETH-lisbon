// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestUtils.sol";

import "../src/FlashLoan.sol";

import {ERC20Interface} from "../src/FlashLoan.sol";

contract FlashLoanTest is Test, TestUtils {
    FlashLoan public flashLoan;

    address public constant WETH_AAVE = 0xCCB14936C2E000ED8393A571D15A2672537838Ad;
    address public constant WETH = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;

    uint256 public constant INITIAL_WETH_AAVE = 1000 ether;
    uint256 public constant INITIAL_WETH = 10 ether;

    uint256 public constant WETH_LOAN = 1000 ether;

    function setUp() public {
        cheat.createSelectFork("goerli_rpc", 8984230);
        flashLoan = new FlashLoan();

        // We wrap some aave eth.
        (bool success,) = WETH_AAVE.call{value: INITIAL_WETH_AAVE}("");
        require(success, "WETH aave transfer failed");

        // We transfer aave weth to the flash loan contract.
        (success,) = WETH_AAVE.call{value: 0}(
            abi.encodeWithSignature("transfer(address,uint256)", address(flashLoan), INITIAL_WETH_AAVE)
        );
        require(success, "WETH aave transfer failed");

        // We wrap some eth.
        (bool success2,) = WETH.call{value: INITIAL_WETH}("");
        require(success2, "WETH transfer failed");

        // We transfer weth to the flash loan contract.
        (success2,) =
            WETH.call{value: 0}(abi.encodeWithSignature("transfer(address,uint256)", address(flashLoan), INITIAL_WETH));
        require(success2, "WETH transfer failed");

        // console.log("balance before %s", ERC20Interface(WETH).balanceOf(address(flashLoan)));

        // We approve the flash loan contract to spend our WETH.
        flashLoan.approve(WETH_AAVE);

        // We add liquidity.
        (uint256 amountA, uint256 amountB, uint256 liquidity) =
            flashLoan.addLiquidity(WETH, WETH_AAVE, 5 ether, 100 ether, 2, 80, address(this), block.timestamp + 1000);

        console.log("amountA %s and %s and %s", amountA, amountB, liquidity);

        // Check returned values
        require(amountA > 0, "Amount A is zero");
        require(amountB > 0, "Amount B is zero");
        require(liquidity > 0, "Liquidity is zero");
    }

    // function testWethBalance() public {
    //     assertEq(ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan)), INITIAL_WETH_AAVE);
    // }

    function testWethFlashLoan() public {
        // We execute the flashloan.

        uint256 balanceBefore = ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan));

        flashLoan.flashloan(WETH_AAVE, WETH_LOAN);

        // We should have 1000 - 0.05% fee.
        uint256 fee = flashLoan.getCurrentFee();
        // console.log("fee %s", fee);
        assertEq(fee, 5);

        console.log("balance after flashloan %s", ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan)));

        uint256 deductedAmount = WETH_LOAN * fee / 10000;
        assertEq(ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan)), balanceBefore - deductedAmount);
    }

    // function testAddLiquidity() public {
    //     // We add liquidity.
    //     (uint256 amountA, uint256 amountB, uint256 liquidity) =
    //         flashLoan.addLiquidity(WETH, WETH_AAVE, 5 ether, 100 ether, 2, 80, address(this), block.timestamp + 1000);

    //     console.log("amountA %s and %s and %s", amountA, amountB, liquidity);

    //     // Check returned values
    //     require(amountA > 0, "Amount A is zero");
    //     require(amountB > 0, "Amount B is zero");
    //     require(liquidity > 0, "Liquidity is zero");
    // }

    function testSwapToken() public {
        uint256 amountIn = 10 ether; // Adjust based on your token's decimals
        uint256 amountOutMin = 1000; // Adjust based on expected price and your token's decimals
        uint256 deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!

        // Call the swapTokens function
        uint256[] memory amounts =
            flashLoan.swapTokens(WETH_AAVE, WETH, amountIn, amountOutMin, address(this), deadline);

        uint256 a = amounts[0];
        uint256 b = amounts[1];
        console.log("Swapped %s for aave eth %s", a, WETH_AAVE);
        console.log("Swapped %s for %s", b, WETH);
    }
}
