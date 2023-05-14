import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminFeeReceiverUpdated,
  AdminFeeUpdated,
  AgentPermit,
  BorrowRefferal,
  ERC20Approve,
  ERC20Permit,
  ERC721Approve,
  ERC721Permit,
  ExecuteInterceptor,
  FlashExecute,
  LoanLiquidated,
  LoanRepaid,
  LoanStarted,
  MaxBorrowDurationUpdated,
  MinBorrowDurationUpdated,
  NonceCancelled,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  ServiceFee,
  TimeStampCancelled,
  Unpaused,
  UpdageInterceptor,
  UpdateStatus
} from "../generated/Contract/Contract"

export function createAdminFeeReceiverUpdatedEvent(
  param0: Address
): AdminFeeReceiverUpdated {
  let adminFeeReceiverUpdatedEvent = changetype<AdminFeeReceiverUpdated>(
    newMockEvent()
  )

  adminFeeReceiverUpdatedEvent.parameters = new Array()

  adminFeeReceiverUpdatedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return adminFeeReceiverUpdatedEvent
}

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

export function createAgentPermitEvent(
  agent: Address,
  selector: Bytes,
  isPermitted: boolean
): AgentPermit {
  let agentPermitEvent = changetype<AgentPermit>(newMockEvent())

  agentPermitEvent.parameters = new Array()

  agentPermitEvent.parameters.push(
    new ethereum.EventParam("agent", ethereum.Value.fromAddress(agent))
  )
  agentPermitEvent.parameters.push(
    new ethereum.EventParam("selector", ethereum.Value.fromFixedBytes(selector))
  )
  agentPermitEvent.parameters.push(
    new ethereum.EventParam(
      "isPermitted",
      ethereum.Value.fromBoolean(isPermitted)
    )
  )

  return agentPermitEvent
}

export function createBorrowRefferalEvent(
  loanId: BigInt,
  borrower: Address,
  referral: BigInt
): BorrowRefferal {
  let borrowRefferalEvent = changetype<BorrowRefferal>(newMockEvent())

  borrowRefferalEvent.parameters = new Array()

  borrowRefferalEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  borrowRefferalEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  borrowRefferalEvent.parameters.push(
    new ethereum.EventParam(
      "referral",
      ethereum.Value.fromUnsignedBigInt(referral)
    )
  )

  return borrowRefferalEvent
}

export function createERC20ApproveEvent(
  user: Address,
  erc20Contract: Address,
  amount: BigInt
): ERC20Approve {
  let erc20ApproveEvent = changetype<ERC20Approve>(newMockEvent())

  erc20ApproveEvent.parameters = new Array()

  erc20ApproveEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  erc20ApproveEvent.parameters.push(
    new ethereum.EventParam(
      "erc20Contract",
      ethereum.Value.fromAddress(erc20Contract)
    )
  )
  erc20ApproveEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return erc20ApproveEvent
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

export function createERC721ApproveEvent(
  user: Address,
  erc721Contract: Address,
  isPermitted: boolean
): ERC721Approve {
  let erc721ApproveEvent = changetype<ERC721Approve>(newMockEvent())

  erc721ApproveEvent.parameters = new Array()

  erc721ApproveEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  erc721ApproveEvent.parameters.push(
    new ethereum.EventParam(
      "erc721Contract",
      ethereum.Value.fromAddress(erc721Contract)
    )
  )
  erc721ApproveEvent.parameters.push(
    new ethereum.EventParam(
      "isPermitted",
      ethereum.Value.fromBoolean(isPermitted)
    )
  )

  return erc721ApproveEvent
}

export function createERC721PermitEvent(
  erc721Contract: Address,
  isPermitted: boolean
): ERC721Permit {
  let erc721PermitEvent = changetype<ERC721Permit>(newMockEvent())

  erc721PermitEvent.parameters = new Array()

  erc721PermitEvent.parameters.push(
    new ethereum.EventParam(
      "erc721Contract",
      ethereum.Value.fromAddress(erc721Contract)
    )
  )
  erc721PermitEvent.parameters.push(
    new ethereum.EventParam(
      "isPermitted",
      ethereum.Value.fromBoolean(isPermitted)
    )
  )

  return erc721PermitEvent
}

export function createExecuteInterceptorEvent(
  queueId: BigInt,
  nftAsset: Address,
  tokenId: BigInt,
  interceptor: Address,
  before: boolean
): ExecuteInterceptor {
  let executeInterceptorEvent = changetype<ExecuteInterceptor>(newMockEvent())

  executeInterceptorEvent.parameters = new Array()

  executeInterceptorEvent.parameters.push(
    new ethereum.EventParam(
      "queueId",
      ethereum.Value.fromUnsignedBigInt(queueId)
    )
  )
  executeInterceptorEvent.parameters.push(
    new ethereum.EventParam("nftAsset", ethereum.Value.fromAddress(nftAsset))
  )
  executeInterceptorEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  executeInterceptorEvent.parameters.push(
    new ethereum.EventParam(
      "interceptor",
      ethereum.Value.fromAddress(interceptor)
    )
  )
  executeInterceptorEvent.parameters.push(
    new ethereum.EventParam("before", ethereum.Value.fromBoolean(before))
  )

  return executeInterceptorEvent
}

export function createFlashExecuteEvent(
  loanId: BigInt,
  nft: Address,
  nftTokenId: BigInt,
  flashTarget: Address
): FlashExecute {
  let flashExecuteEvent = changetype<FlashExecute>(newMockEvent())

  flashExecuteEvent.parameters = new Array()

  flashExecuteEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  flashExecuteEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  flashExecuteEvent.parameters.push(
    new ethereum.EventParam(
      "nftTokenId",
      ethereum.Value.fromUnsignedBigInt(nftTokenId)
    )
  )
  flashExecuteEvent.parameters.push(
    new ethereum.EventParam(
      "flashTarget",
      ethereum.Value.fromAddress(flashTarget)
    )
  )

  return flashExecuteEvent
}

export function createLoanLiquidatedEvent(
  loanId: BigInt,
  borrower: Address,
  lender: Address,
  borrowAmount: BigInt,
  nftTokenId: BigInt,
  loanMaturityDate: BigInt,
  loanLiquidationDate: BigInt,
  nftAsset: Address
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
      "borrowAmount",
      ethereum.Value.fromUnsignedBigInt(borrowAmount)
    )
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftTokenId",
      ethereum.Value.fromUnsignedBigInt(nftTokenId)
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
    new ethereum.EventParam("nftAsset", ethereum.Value.fromAddress(nftAsset))
  )

  return loanLiquidatedEvent
}

export function createLoanRepaidEvent(
  loanId: BigInt,
  borrower: Address,
  lender: Address,
  borrowAmount: BigInt,
  nftTokenId: BigInt,
  repayAmount: BigInt,
  adminFee: BigInt,
  nftAsset: Address,
  borrowAsset: Address
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
      "borrowAmount",
      ethereum.Value.fromUnsignedBigInt(borrowAmount)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "nftTokenId",
      ethereum.Value.fromUnsignedBigInt(nftTokenId)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "repayAmount",
      ethereum.Value.fromUnsignedBigInt(repayAmount)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "adminFee",
      ethereum.Value.fromUnsignedBigInt(adminFee)
    )
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam("nftAsset", ethereum.Value.fromAddress(nftAsset))
  )
  loanRepaidEvent.parameters.push(
    new ethereum.EventParam(
      "borrowAsset",
      ethereum.Value.fromAddress(borrowAsset)
    )
  )

  return loanRepaidEvent
}

export function createLoanStartedEvent(
  loanId: BigInt,
  borrower: Address,
  lender: Address,
  nonce: BigInt,
  loanDetail: ethereum.Tuple,
  target: Address,
  selector: Bytes
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
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )
  loanStartedEvent.parameters.push(
    new ethereum.EventParam("loanDetail", ethereum.Value.fromTuple(loanDetail))
  )
  loanStartedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  loanStartedEvent.parameters.push(
    new ethereum.EventParam("selector", ethereum.Value.fromFixedBytes(selector))
  )

  return loanStartedEvent
}

export function createMaxBorrowDurationUpdatedEvent(
  newMaxBorrowDuration: BigInt
): MaxBorrowDurationUpdated {
  let maxBorrowDurationUpdatedEvent = changetype<MaxBorrowDurationUpdated>(
    newMockEvent()
  )

  maxBorrowDurationUpdatedEvent.parameters = new Array()

  maxBorrowDurationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newMaxBorrowDuration",
      ethereum.Value.fromUnsignedBigInt(newMaxBorrowDuration)
    )
  )

  return maxBorrowDurationUpdatedEvent
}

export function createMinBorrowDurationUpdatedEvent(
  newMinBorrowDuration: BigInt
): MinBorrowDurationUpdated {
  let minBorrowDurationUpdatedEvent = changetype<MinBorrowDurationUpdated>(
    newMockEvent()
  )

  minBorrowDurationUpdatedEvent.parameters = new Array()

  minBorrowDurationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newMinBorrowDuration",
      ethereum.Value.fromUnsignedBigInt(newMinBorrowDuration)
    )
  )

  return minBorrowDurationUpdatedEvent
}

export function createNonceCancelledEvent(
  lender: Address,
  nonce: BigInt
): NonceCancelled {
  let nonceCancelledEvent = changetype<NonceCancelled>(newMockEvent())

  nonceCancelledEvent.parameters = new Array()

  nonceCancelledEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  nonceCancelledEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )

  return nonceCancelledEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createServiceFeeEvent(
  loanId: BigInt,
  target: Address,
  serviceFeeRate: i32,
  feeAmount: BigInt
): ServiceFee {
  let serviceFeeEvent = changetype<ServiceFee>(newMockEvent())

  serviceFeeEvent.parameters = new Array()

  serviceFeeEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  serviceFeeEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  serviceFeeEvent.parameters.push(
    new ethereum.EventParam(
      "serviceFeeRate",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(serviceFeeRate))
    )
  )
  serviceFeeEvent.parameters.push(
    new ethereum.EventParam(
      "feeAmount",
      ethereum.Value.fromUnsignedBigInt(feeAmount)
    )
  )

  return serviceFeeEvent
}

export function createTimeStampCancelledEvent(
  lender: Address,
  timestamp: BigInt
): TimeStampCancelled {
  let timeStampCancelledEvent = changetype<TimeStampCancelled>(newMockEvent())

  timeStampCancelledEvent.parameters = new Array()

  timeStampCancelledEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  timeStampCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return timeStampCancelledEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpdageInterceptorEvent(
  queueId: BigInt,
  nftAsset: Address,
  tokenId: BigInt,
  interceptor: Address,
  add: boolean
): UpdageInterceptor {
  let updageInterceptorEvent = changetype<UpdageInterceptor>(newMockEvent())

  updageInterceptorEvent.parameters = new Array()

  updageInterceptorEvent.parameters.push(
    new ethereum.EventParam(
      "queueId",
      ethereum.Value.fromUnsignedBigInt(queueId)
    )
  )
  updageInterceptorEvent.parameters.push(
    new ethereum.EventParam("nftAsset", ethereum.Value.fromAddress(nftAsset))
  )
  updageInterceptorEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  updageInterceptorEvent.parameters.push(
    new ethereum.EventParam(
      "interceptor",
      ethereum.Value.fromAddress(interceptor)
    )
  )
  updageInterceptorEvent.parameters.push(
    new ethereum.EventParam("add", ethereum.Value.fromBoolean(add))
  )

  return updageInterceptorEvent
}

export function createUpdateStatusEvent(
  loanId: BigInt,
  xy3NftId: BigInt,
  newStatus: i32
): UpdateStatus {
  let updateStatusEvent = changetype<UpdateStatus>(newMockEvent())

  updateStatusEvent.parameters = new Array()

  updateStatusEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  updateStatusEvent.parameters.push(
    new ethereum.EventParam(
      "xy3NftId",
      ethereum.Value.fromUnsignedBigInt(xy3NftId)
    )
  )
  updateStatusEvent.parameters.push(
    new ethereum.EventParam(
      "newStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newStatus))
    )
  )

  return updateStatusEvent
}
