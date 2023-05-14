import {
  LoanLiquidated as LoanLiquidatedEvent,
  LoanRepaid as LoanRepaidEvent,
  LoanStarted as LoanStartedEvent,
} from "../generated/XY3V2/XY3V2"
import {
Loan
} from "../generated/schema"

export function handleLoanLiquidated(event: LoanLiquidatedEvent): void {
  let id = "x2y2" + "-" + event.params.loanId.toString();
  let loan = Loan.load(id)
  if(loan) {
    loan.status = 'liquidated'
    loan.save()
  }
}

export function handleLoanRepaid(event: LoanRepaidEvent): void {
  let id = "x2y2" + "-" + event.params.loanId.toString();
  let loan = Loan.load(id)
  if(loan) {
    loan.status = 'repaid'
    loan.save()
  }
}

export function handleLoanStarted(event: LoanStartedEvent): void {
  let id = "x2y2" + "-" + event.params.loanId.toString();
  let entity = new Loan(id)
  entity.loanId = event.params.loanId
  entity.borrower = event.params.borrower
  entity.lender = event.params.lender
  entity.borrowAmount = event.params.loanDetail.borrowAmount
  entity.repayAmount =
    event.params.loanDetail.repayAmount
  entity.nftTokenId = event.params.loanDetail.nftTokenId
  entity.borrowAsset =
    event.params.loanDetail.borrowAsset
  entity.loanDuration =  event.params.loanDetail.loanDuration
  entity.loanStart = event.params.loanDetail.loanStart
  entity.nftAsset =
     event.params.loanDetail.nftAsset

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.dapp = 'x2y2'
  entity.status = 'active'

  entity.save()
}
