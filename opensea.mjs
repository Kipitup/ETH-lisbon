import fetch from 'node-fetch'
import BigNumber from "bignumber.js";
import { createWalletClient, http } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'

const account = mnemonicToAccount('what boring term embrace weather control name pass index corn alien always')

const client = createWalletClient({
  account,
  chain: goerli,
  transport: http()
})

async function sendTransaction({ orderData }) {

}

async function getBestOfferAndFulfill({ seller, nftAddress, tokenId, collectionSlug }) {
  // Fetch collection offers
  const offersResponse = await fetch(`https://testnets-api.opensea.io/v2/offers/collection/${collectionSlug}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  const offersData = await offersResponse.json();

  let bestOffer = null;
  let maxAmount = new BigNumber(0);

  // Iterate over offers to find the best one
  for (const offer of offersData.offers) {
    const currentOfferAmount = new BigNumber(offer.protocol_data.parameters.offer[0].startAmount);
    console.log(currentOfferAmount)

    if (currentOfferAmount.gt(maxAmount)) {
      maxAmount = currentOfferAmount;
      bestOffer = offer;
    }
  }

  // console.log(bestOffer, bestOffer.protocol_data.parameters.offer)
  // return
  // Convert Wei to Ether
  const maxAmountInEther = maxAmount.dividedBy(new BigNumber(10).pow(18));

  console.log(`Best offer amount in Ether: ${maxAmountInEther.toString()}`);

  if (!bestOffer) {
    console.log('No offers found');
    return;
  }

  // Fulfill the best offer
  const fulfillmentData = {
    offer: {
      hash: bestOffer.order_hash,
      chain: bestOffer.chain,
      protocol_address: bestOffer.protocol_address
    },
    fulfiller: {
      address: seller
    },
    consideration: {
      asset_contract_address: nftAddress,
      token_id: tokenId
    }
  };

  console.log(fulfillmentData)

  const fulfillmentResponse = await fetch('https://testnets-api.opensea.io/v2/offers/fulfillment_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fulfillmentData)
  });

  const fulfillmentDataResponse = await fulfillmentResponse.json();
  console.log('Fulfillment response:', fulfillmentDataResponse);
  return fulfillmentDataResponse
}

async function main() {
  try {
    const orderData = await getBestOfferAndFulfill({
      seller: '0xef13aac4dbcf336ed855a0ee4166117332501c75',
      nftAddress: '0x28Ba8AF8C8730F4C39fb0Ac9779372183Fb4EAD9',
      tokenId: '112',
      collectionSlug: 'cyan-numbers'
    });

    sendTransaction({ orderData })

  } catch (error) {
    console.error("main entry: ", error)
  }
}

main()