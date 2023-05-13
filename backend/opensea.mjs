import fetch from 'node-fetch'
import BigNumber from "bignumber.js";
import { createWalletClient, http, toHex, encodeFunctionData, parseEther, numberToHex } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'
import openseaGoerliABI from './opensea-goerli-abi.mjs';

const account = mnemonicToAccount('what boring term embrace weather control name pass index corn alien always')

const walletClient = createWalletClient({
  account,
  chain: goerli,
  transport: http()
})


async function sendTransaction({ orderData, seller }) {
  try {
    console.log(orderData.fulfillment_data.transaction)
    const data = encodeFunctionData({
      abi: openseaGoerliABI,
      functionName: 'fulfillBasicOrder_efficient_6GL6yc',
      args: [
        orderData.fulfillment_data.transaction.input_data.parameters
      ]
    })

    const transaction = {
      to: orderData.fulfillment_data.transaction.to,
      data: data, // The encoded function call (your `input_data` from the JSON)
      value: parseEther("0"), // The amount of Ether to send with the transaction
      chainId: orderData.fulfillment_data.transaction.chain // The network ID (5 for Goerli in this case)
    };

    console.log(transaction)
    // const hash = await walletClient.sendTransaction(transaction)

    // console.log(hash)

  } catch (error) {
    console.error("sending tx: ", error)
  }
}

async function getBestOfferAndFulfill({ seller, nftAddress, tokenId, collectionSlug }) {
  // Fetch collection offers
  const offersResponse = await fetch(`https://testnets-api.opensea.io/v2/orders/goerli/seaport/offers?asset_contract_address=${nftAddress}&token_ids=${tokenId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  const offersData = await offersResponse.json();

  let bestOffer = null;
  let maxAmount = new BigNumber(0);

  // Iterate over offers to find the best one
  for (const offer of offersData.orders) {
    if (offer.side === "bid") {
      const currentOfferAmount = new BigNumber(offer.protocol_data.parameters.offer[0].startAmount);

      if (currentOfferAmount.gt(maxAmount)) {
        maxAmount = currentOfferAmount;
        bestOffer = offer;
      }
    }
  }

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
      chain: "goerli",
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
  if (fulfillmentDataResponse.errors) {
    console.log('Fulfillment response:', fulfillmentDataResponse.errors[0]);
  } else {
    console.log('Fulfillment response:', fulfillmentDataResponse);
  }
  return fulfillmentDataResponse
}

async function main(seller) {
  try {
    const orderData = await getBestOfferAndFulfill({
      seller,
      nftAddress: '0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b',
      tokenId: '2756267',
      collectionSlug: 'multifaucet-nft-v3'
    });

    sendTransaction({ orderData, seller })

  } catch (error) {
    console.error("main entry: ", error)
  }
}

main('0x04c1b9B656Ae90DcFF5D363884c1D812D6790F9a')