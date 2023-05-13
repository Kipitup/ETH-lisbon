// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "./TestUtils.sol";

import "../src/FlashLoan.sol";

import {ERC20Interface} from "../src/FlashLoan.sol";

contract FlashLoanTest is Test, TestUtils {
    FlashLoan public flashLoan;

    address public constant WETH_AAVE = 0xCCB14936C2E000ED8393A571D15A2672537838Ad;
    address public constant WETH = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    address public constant SEAPORT = 0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC;

    uint256 public constant INITIAL_WETH_AAVE = 1000 ether;
    uint256 public constant INITIAL_WETH = 10 ether;

    uint256 public constant WETH_LOAN = 1000 ether;

    function setUp() public {
        cheat.createSelectFork("goerli_rpc");
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

        // console.log("amountA %s and %s and %s", amountA, amountB, liquidity);

        // Check returned values
        require(amountA > 0, "Amount A is zero");
        require(amountB > 0, "Amount B is zero");
        require(liquidity > 0, "Liquidity is zero");
    }

    function testSellNFT() public {
        (bool success,) = SEAPORT.call{value: 0}(
            "0x000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000f5de760f2e916647fd766b4ad9e85ff943ce3a2b00000000000000000000000000000000000000000000000000000000002a0eab000000000000000000000000000000000000000000000000000000000000000100000000000000000000000004c1b9b656ae90dcff5d363884c1d812d6790f9a000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c00000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000470de4df820000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000645fe0a6000000000000000000000000000000000000000000000000000000006463d5130000000000000000000000000000000000000000000000000000000000000000360c6ebe0000000000000000000000000000000000000000d2ed38e7bb88abe60000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000001c6bf526340000000000000000000000000000000a26b00c1f0df003000390027140000faa7190000000000000000000000000000000000000000000000000000000000000040cb4b264e01cb19e00e7a659514cad5231f3fcc22c35aff0f7cc64d0b256b5468228b8e23b431ed7c244f9abc9c584e0b1f7f4947a772e114542c19b11ae4f25c"
        );
        console.log("success %s", success);
    }

    // function testWethBalance() public {
    //     assertEq(ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan)), INITIAL_WETH_AAVE);
    // }

    // function testWethFlashLoan() public {
    //     // We execute the flashloan.

    //     uint256 balanceBefore = ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan));

    //     flashLoan.flashloan(WETH_AAVE, WETH_LOAN);

    //     // We should have 1000 - 0.05% fee.
    //     uint256 fee = flashLoan.getCurrentFee();
    //     // console.log("fee %s", fee);
    //     assertEq(fee, 5);

    //     // console.log("balance after flashloan %s", ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan)));

    //     uint256 deductedAmount = WETH_LOAN * fee / 10000;
    //     assertEq(ERC20Interface(WETH_AAVE).balanceOf(address(flashLoan)), balanceBefore - deductedAmount);
    // }

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

    // function testSwapToken() public {
    //     uint256 amountIn = 10 ether; // Adjust based on your token's decimals
    //     uint256 amountOutMin = 1000; // Adjust based on expected price and your token's decimals
    //     uint256 deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!

    //     // Call the swapTokens function
    //     uint256[] memory amounts =
    //         flashLoan.swapTokens(WETH_AAVE, WETH, amountIn, amountOutMin, address(this), deadline);

    //     uint256 a = amounts[0];
    //     uint256 b = amounts[1];
    //     console.log("Swapped %s for aave eth %s", a, WETH_AAVE);
    //     console.log("Swapped %s for %s", b, WETH);
    // }

    // function testPayBackLoan() public {
    //     flashLoan.payBackLoan(2000);
    // }
}
