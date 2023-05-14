import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminFeeUpdated,
  ERC20Permit,
  LoanLiquidated,
  LoanRenegotiated,
  LoanRepaid,
  LoanStarted,
  MaximumLoanDurationUpdated,
  OwnershipTransferred,
  Paused,
  Unpaused
} from "../generated/DirectLoanFixedOfferRedeploy/DirectLoanFixedOfferRedeploy"

export function createAdminFeeUpdatedEvent(newAdminFee: i32): AdminFeeUpdated {
  let adminFeeUpdatedEvent = changetype<AdminFeeUpdated>(newMockEvent())

  adminFeeUpdatedEvent.parameters = new Array()

  adminFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newAdminFee))
    )
  )

  return adminFeeUpdatedEvent
}

export function createERC20PermitEvent(
  erc20Contract: Address,
  isPermitted: boolean
): ERC20Permit {
  let erc20PermitEvent = changetype<ERC20Permit>(newMockEvent())

  erc20PermitEvent.parameters = new Array()

  erc20PermitEvent.parameters.push(
    new ethereum.EventParam(
      "erc20Contract",
      ethereum.Value.fromAddress(erc20Contract)
    )
  )
  erc20PermitEvent.parameters.push(
    new ethereum.EventParam(
      "isPermitted",
      ethereum.Value.fromBoolean(isPermitted)
    )
  )

  return erc20PermitEvent
}

export function createLoanLiquidatedEvent(
  loanId: BigInt,
  borrower: Address,
  lender: Address,
  loanPrincipalAmount: BigInt,
  nftCollateralId: BigInt,
  loanMaturityDate: BigInt,
  loanLiquidationDate: BigInt,
  nftCollateralContract: Address
): LoanLiquidated {
  let loanLiquidatedEvent = changetype<LoanLiquidated>(newMockEvent())

  loanLiquidatedEvent.parameters = new Array()

  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "loanPrincipalAmount",
      ethereum.Value.fromUnsignedBigInt(loanPrincipalAmount)
    )
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftCollateralId",
      ethereum.Value.fromUnsignedBigInt(nftCollateralId)
    )
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "loanMaturityDate",
      ethereum.Value.fromUnsignedBigInt(loanMaturityDate)
    )
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "loanLiquidationDate",
      ethereum.Value.fromUnsignedBigInt(loanLiquidationDate)
    )
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftCollateralContract",
      ethereum.Value.fromAddress(nftCollateralContract)
    )
  )

  return loanLiquidatedEvent
}

export function createLoanRenegotiatedEvent(
  loanId: BigInt,
  borrower: Address,
  lender: Address,
  newLoanDuration: BigInt,
  newMaximumRepaymentAmount: BigInt,
  renegotiationFee: BigInt,
  renegotiationAdminFee: BigInt
): LoanRenegotiated {
  let loanRenegotiatedEvent = changetype<LoanRenegotiated>(newMockEvent())

  loanRenegotiatedEvent.parameters = new Array()

  loanRenegotiatedEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  loanRenegotiatedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanRenegotiatedEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  loanRenegotiatedEvent.parameters.push(
    new ethereum.EventParam(
      "newLoanDuration",
      ethereum.Value.fromUnsignedBigInt(newLoanDuration)
    )
  )
  loanRenegotiatedEvent.parameters.push(
    new ethereum.EventParam(
      "newMaximumRepaymentAmount",
      ethereum.Value.fromUnsignedBigInt(newMaximumRepaymentAmount)
    )
  )
  loanRenegotiatedEvent.parameters.push(
    new ethereum.EventParam(
      "renegotiationFee",
      ethereum.Value.fromUnsignedBigInt(renegotiationFee)
    )
  )
  loanRenegotiatedEvent.parameters.push(
    new ethereum.EventParam(
      "renegotiationAdminFee",
      ethereum.Value.fromUnsignedBigInt(renegotiationAdminFee)
    )
  )

  return loanRenegotiatedEvent
}

export function createLoanRepaidEvent(
  loanId: BigInt,
  borrower: Address,
  lender: Address,
  loanPrincipalAmount: BigInt,
  nftCollateralId: BigInt,
  amountPaidToLender: BigInt,
  adminFee: BigInt,
  revenueShare: BigInt,
  revenueSharePartner: Address,
  nftCollateralContract: Address,
  loanERC20Denomination: Address
): LoanRepaid {
  let loanRepaidEvent = changetype<LoanRepaid>(newMockEvent())

  loanRepaidEvent.parameters = new Array()

  loanRepaidEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "loanPrincipalAmount",
      ethereum.Value.fromUnsignedBigInt(loanPrincipalAmount)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "nftCollateralId",
      ethereum.Value.fromUnsignedBigInt(nftCollateralId)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "amountPaidToLender",
      ethereum.Value.fromUnsignedBigInt(amountPaidToLender)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "adminFee",
      ethereum.Value.fromUnsignedBigInt(adminFee)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "revenueShare",
      ethereum.Value.fromUnsignedBigInt(revenueShare)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "revenueSharePartner",
      ethereum.Value.fromAddress(revenueSharePartner)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "nftCollateralContract",
      ethereum.Value.fromAddress(nftCollateralContract)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "loanERC20Denomination",
      ethereum.Value.fromAddress(loanERC20Denomination)
    )
  )

  return loanRepaidEvent
}

export function createLoanStartedEvent(
  loanId: BigInt,
  borrower: Address,
  lender: Address,
  loanTerms: ethereum.Tuple,
  loanExtras: ethereum.Tuple
): LoanStarted {
  let loanStartedEvent = changetype<LoanStarted>(newMockEvent())

  loanStartedEvent.parameters = new Array()

  loanStartedEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  loanStartedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanStartedEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  loanStartedEvent.parameters.push(
    new ethereum.EventParam("loanTerms", ethereum.Value.fromTuple(loanTerms))
  )
  loanStartedEvent.parameters.push(
    new ethereum.EventParam("loanExtras", ethereum.Value.fromTuple(loanExtras))
  )

  return loanStartedEvent
}

export function createMaximumLoanDurationUpdatedEvent(
  newMaximumLoanDuration: BigInt
): MaximumLoanDurationUpdated {
  let maximumLoanDurationUpdatedEvent = changetype<MaximumLoanDurationUpdated>(
    newMockEvent()
  )

  maximumLoanDurationUpdatedEvent.parameters = new Array()

  maximumLoanDurationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newMaximumLoanDuration",
      ethereum.Value.fromUnsignedBigInt(newMaximumLoanDuration)
    )
  )

  return maximumLoanDurationUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
