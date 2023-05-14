import type BigNumber from 'bignumber.js'

export interface INFT {
	contract_address: string
	token_id?: string
	offers?: IOffer[]
}

export interface INFTMetadata {
	contract?: {
		address: string
	}
	address?: string
	contractMetadata: {
		name?: string
		symbol?: string
		openSea?: {
			floorPrice?: number
			collectionName?: string
			imageUrl?: string
			description?: string
			twitterUsername?: string
			externalUrl?: string
		}
	}
	description?: string
	title?: string
	metadata?: {
		description?: string
		image?: string
		name?: string
	}
	id?: { tokenId: string }
	error?: string
	media?: {
		gateway: string
		thumbnail?: string
		format: string
		raw: string
	}[]
}

export interface IOfferNFTFI {
	borrower: {
		address: string
	}
	date: {
		offered: string
	}
	errors: any
	id: string
	lender: {
		address: string
		nonce: string
	}
	nft: {
		id: string
		address: string
		project: any
	}
	nftfi: {
		contract: any
		fee: any
	}
	referrer: {
		address: string
	}
	signature: string
	terms: {
		loan: any
	}
}

export interface IOffer {
	id: string
	amount: number
	amount_value: number
	apr: string
	currency: `0x${string}`
	nft_asset: `0x${string}`
	project: 'nftfi' | 'benddao' | 'x2y2' | 'arcade' | 'blur' | 'paraspace'
	created_at: string
	lender?: `0x${string}`
	repayment?: number
	duration?: string
	expires?: string
	admin_fee?: string
}

export interface ILoanBendDao {
	loanId: number
	reserveAsset: `0x${string}`
	totalCollateral: number
	totalDebt: number
	availableBorrow: number
	healthFactor: number
	apr: string
}

export interface IBendDaoQuote {
	floorInEth: string
	borrowableToken: string
	currentVariableBorrowRate: string
	availableBorrow: string
	ltv: string
	liquidationThreshold: string
	loanUrl: string
}

export interface INFTFi {
	account: any
	config: any
	erc20: any
	erc721: any
	listings: any
	loans: any
	offers: any
	utils: any
}

export interface ILoan {
	loanId: number | BigNumber
	date?: {
		repaid?: boolean
		dueTime?: number
		started: number
	}
	duration?: number
	borrowed?: BigNumber
	payoff: BigNumber
	currency: `0x${string}`
	healthFactor?: BigNumber
	apr?: string
	status?: string | number
	dapp: 'nftfi' | 'benddao' | 'x2y2' | 'blur' | 'arcade' | 'paraspace'
}

export interface ILoanNew {
	id: string
	loanId: string
	borrower: {
		id: `0x${string}`
		totalBorrowed?: string
	}
	lender: {
		id: `0x${string}`
		totalLent?: string
	}
	loanDuration?: string
	loanStart?: string
	isOriginal?: boolean
	borrowAmount?: string
	borrowAmountInEth?: string
	repayAmount: string
	repayAmountInEth?: string
	borrowAsset: `0x${string}`
	nftTokenId: string
	nftAsset: {
		id: `0x${string}`
	}
	healthFactor?: number
	apr?: string
	dapp: 'nftfi' | 'benddao' | 'x2y2' | 'blur' | 'arcade' | 'paraspace'
	contract_address: `0x${string}`
	blockNumber: string
	blockTimestamp: string
	status: 'active' | 'repaid' | 'auctioned' | 'liquidated' | 'refinanced'
}

export interface ILoanList {
	amount: number
	amount_value: number
	borrower: `0x${string}`
	currency: `0x${string}`
	duration: number
	listed: string
	nft_asset: `0x${string}`
	nft_token_id: string
	project: 'nftfi' | 'benddao' | 'x2y2' | 'blur' | 'arcade' | 'paraspace'
	repayment: number
	loan_listings_borrower: {
		loanCount: number
		liquidationCount: number
		loans_histories_aggregate: {
			aggregate: {
				count: number
			}
		}
	}
}

export interface ILoanNftFi {
	borrower: {
		address: string
	}
	date: {
		repaid?: boolean
		started: string
	}
	id: number
	nft: {
		address: string
		id: string
		name: string
		project: { name: string }
	}
	nftfi: {
		contract: { name: string }
	}
	status: string
	terms: {
		loan: {
			currency: `0x${string}`
			duration: number
			principal: BigNumber
			repayment: BigNumber
			unit: string
		}
	}
}

export interface IStoreUseOffer {
	offer: {
		nft: INFT
		offer: IOffer
	}
	setOffer: (offer: { nft: INFT; offer: IOffer }) => void
}

export interface IStoreUseNFTFi {
	nftfi: INFTFi
	setNFTFi: (nftfi: INFTFi) => void
	clearNFTFi: () => void
}

export interface IStoreUseAddressRouter {
	addressRouterStored: string
	setAddressRouter: (addressRouterStored: string) => void
	clearAddressRouter: () => void
}

export interface IStoreUseLoan {
	loan: any
	setLoan: (loan: any) => void
	clearLoan: () => void
}

export interface IStoreUseUserNfts {
	userNfts: INFT[]
	setUserNFTs: (userNfts: INFT[]) => void
	clearUserNFTs: () => void
	getOneUserNft: (contractAddress: string, tokenId: string) => INFT
}

export interface IStoreUseLoanedNfts {
	loans: ILoanNew[]
	setLoans: (loan: ILoanNew[]) => void
	clearLoans: () => void
}

export interface ITopBorrowerLender {
	id: `0x${string}`
	volume: number
	loans_count: number
	weigthed_avg_apr: number
	liquidations_count: number
	favorite_dapp: string
	favorite_nft: string
}

export interface IBorrowerOrLender {
	avgAPR: string
	avgDuration: string
	benddaoCount: number
	id: string
	liquidationCount: number
	loanCount: number
	nftfiCount: number
	blurCount: number
	totalBorrowed?: string
	totalLent?: string
	repaymentCount: number
	totalLiquidated: string
	totalRepaid: string
	usdCount: number
	wethCount: number
	x2y2Count: number
	collectionCount: {
		borrowCount?: number
		lendCount?: number
		collection: {
			id: `0x${string}`
		}
	}[]
}

export interface ICollection {
	avgAPR: string
	avgDuration: string
	benddaoCount: number
	id: string
	liquidationCount: number
	loanCount: number
	nftfiCount: number
	totalBorrowed: string
	repaymentCount?: number
	totalLiquidated?: string
	totalRepaid?: string
	usdCount?: number
	wethCount?: number
	x2y2Count: number
}

export interface Dictionary<T> {
	[Key: string]: T
}

export interface CommentResp {
	author: string
	authorENS: false | string
	chain: string
	createdOn: string
	downvotes: Array<string>
	editHistory: Array<string>
	metadata: Dictionary<string>
	replyTo: string
	tag1: string
	tag2: string
	text: string
	tid: string
	upvotes: Array<string>
	url: string
	_id: string
	_mod: number
	success?: boolean
	error?: string
}

export interface IVariables {
	lender?: string
	borrower?: string
}
