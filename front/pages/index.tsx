import { useQuery } from '@apollo/client'
import { GET_LATEST_LOANS } from '@/utils/queryTheGraph'
import useSWRImmutable from 'swr/immutable'

export default function Home() {
	const { data, error, loading } = useQuery(GET_LATEST_LOANS, {
		context: { clientName: 'thegraph' }
	}) as { data: { loans: any[] }; error: any; loading: boolean }

	if (!data) return <></>

	return (
		<>
			<main className="flex h-full w-full flex-col ">
				<div className="flex h-[100px] w-full items-center justify-center space-x-20">
					<div className="h-[100px] w-[100px] shrink-0 rounded-lg pt-5">
						<img src={'hose.png'} alt="metaImage" className="object-cover" />
					</div>
					{/* <ModalConnectWallet /> */}
					<p className="text-2xl text-white">Mose The Hose</p>
					<div className="h-[100px] w-[100px] shrink-0 rounded-lg pt-5">
						<img src={'hose.png'} alt="metaImage" className="object-cover" />
					</div>
				</div>
				<Table nfts={data?.loans} />
			</main>
		</>
	)
}

export const useNFTMetadata = (assetContract: string, token: string) => {
	const fetcherGet = (url: string) => fetch(url).then((res) => res.json())

	const {
		data: metadata,
		error: errorMetadata,
		isLoading: isLoadingMetadata
	} = useSWRImmutable<any>(
		`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${assetContract}&tokenId=${token}&refreshCache=false`,
		fetcherGet
	)
	return { metadata, errorMetadata, isLoadingMetadata }
}

export const NFTCell = ({ assetContract, token }: { assetContract: string; token?: string }) => {
	const { metadata } = useNFTMetadata(assetContract, token)

	console.log(metadata, assetContract, token)

	return (
		<div className="flex w-[300px] space-x-4">
			<div className="h-[34px] w-[34px] shrink-0 rounded-lg ">
				{metadata && (
					<img
						src={metadata?.media[0]?.thumbnail ?? metadata?.media[0]?.gateway}
						alt="metaImage"
						className="object-cover"
					/>
				)}
			</div>
			<p className="truncate">{metadata?.contractMetadata.name ?? metadata?.title}</p>
		</div>
	)
}

const Table = ({ nfts }) => {
	return (
		<div className="flex flex-col px-5">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										NFT
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Borrowed
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Debt
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Loan Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										DApp
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{nfts.map((nft, i) => (
									<tr key={i}>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="flex items-center">
												<div className="h-10 flex-shrink-0">
													<NFTCell assetContract={nft.nftAsset} token={nft.nftTokenId} />
												</div>
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="text-sm text-gray-900">{nft.borrowAmount / 1000000000000000000}</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="text-sm text-gray-900">{nft.repayAmount / 1000000000000000000}</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{nft.status}</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{nft.dapp}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
