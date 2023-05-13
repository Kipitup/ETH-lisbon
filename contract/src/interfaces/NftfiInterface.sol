// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

interface NftfiInterface {
    function payBackLoan(uint32 _loanId) external;
    function loanRepaidOrLiquidated(uint32 _loanId) external view returns (bool);
}
