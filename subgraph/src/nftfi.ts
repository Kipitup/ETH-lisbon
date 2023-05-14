import {
  LoanLiquidated as LoanLiquidatedEvent,
  LoanRenegotiated as LoanRenegotiatedEvent,
  LoanRepaid as LoanRepaidEvent,
  LoanStarted as LoanStartedEvent,
} from "../generated/DirectLoanFixedOfferRedeploy/DirectLoanFixedOfferRedeploy"
import {
Loan,
} from "../generated/schema"

export function handleLoanLiquidated(event: LoanLiquidatedEvent): void {
  let id = "nftfi" + "-" + event.params.loanId.toString();
  let loan = Loan.load(id)
  if(loan) {
    loan.status = 'liquidated'
    loan.save()
  }
}

export function handleLoanRepaid(event: LoanRepaidEvent): void {
  let id = "nftfi" + "-" + event.params.loanId.toString();
  let loan = Loan.load(id)
  if(loan) {
    loan.status = 'repaid'
    loan.save()
  }
}

export function handleLoanStarted(event: LoanStartedEvent): void {
  let id = "nftfi" + "-" + event.params.loanId.toString();
  let entity = new Loan(id)
  entity.loanId = event.params.loanId
  entity.borrower = event.params.borrower
  entity.lender = event.params.lender
  entity.borrowAmount = event.params.loanTerms.loanPrincipalAmount
  entity.repayAmount =
    event.params.loanTerms.maximumRepaymentAmount
  entity.nftTokenId = event.params.loanTerms.nftCollateralId
  entity.borrowAsset =
    event.params.loanTerms.loanERC20Denomination
  entity.loanDuration = event.params.loanTerms.loanDuration
  entity.loanStart = event.params.loanTerms.loanStartTime
  entity.nftAsset =
    event.params.loanTerms.nftCollateralContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.dapp = 'nftfi'
  entity.status = 'active'

  entity.save()
}
