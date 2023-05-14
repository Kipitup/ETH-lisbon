import { gql } from '@apollo/client'

export const GET_LATEST_LOANS = gql`
	query getLatestLoans {
		  loans(orderBy: blockTimestamp, orderDirection: desc, first: 50) {
    blockTimestamp
    blockNumber
    borrowAmount
    borrowAsset
    borrower
    dapp
    id
    lender
    loanDuration
    loanId
    loanStart
    nftAsset
    nftTokenId
    repayAmount
    status
    transactionHash
  }
	}
`
