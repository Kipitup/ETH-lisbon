// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "forge-std/Test.sol";

import {AaveInterface} from "./interfaces/AaveInterface.sol";
import {ERC20Interface} from "./interfaces/ERC20Interface.sol";
import {NftfiInterface} from "./interfaces/NftfiInterface.sol";
import {IERC721} from "./interfaces/IERC721.sol";
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

    address public constant SEAPORT = 0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC;

    function sellMyNFT() public {
        address NFT = 0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b;
        address OPENSEA_ALLOW = 0x1E0049783F008A0085193E00003D00cd54003c71;

        IERC721(NFT).setApprovalForAll(OPENSEA_ALLOW, true);

        uint256 bal = IERC721(NFT).balanceOf(address(this));
        console.log("balance NFT %s", bal);

        bool success = IERC721(NFT).isApprovedForAll(0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f, OPENSEA_ALLOW);
        require(success, "Not approved");

        (bool fulfilled,) = SEAPORT.call{value: 0}(
            "0x000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000f5de760f2e916647fd766b4ad9e85ff943ce3a2b00000000000000000000000000000000000000000000000000000000002a0eae000000000000000000000000000000000000000000000000000000000000000100000000000000000000000004c1b9b656ae90dcff5d363884c1d812d6790f9a000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c00000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000470de4df820000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000646015a20000000000000000000000000000000000000000000000000000000064640a1c0000000000000000000000000000000000000000000000000000000000000000360c6ebe00000000000000000000000000000000000000008644cfa96200afae0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000001c6bf526340000000000000000000000000000000a26b00c1f0df003000390027140000faa7190000000000000000000000000000000000000000000000000000000000000040b73ddeba523e8a61782ed1d7e11fad2c3c113551285a68662b789fcaa51664a5090e463e853464401d135c7d068278cdc13b65334f70e5d1490d51f4eea4d3ce"
        );
        console.log("success %s", fulfilled);
        require(fulfilled, "Failed to fulfill");

        // nftfi.sellMyNFT();
    }
}
