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
    const data = encodeFunctionData({
      abi: openseaGoerliABI,
      functionName: 'matchAdvancedOrders',
      args: [
        orderData.fulfillment_data.transaction.input_data.orders,
        orderData.fulfillment_data.transaction.input_data.criteriaResolvers,
        orderData.fulfillment_data.transaction.input_data.fulfillments,
        seller
      ]
    })

    const transaction = {
      to: orderData.fulfillment_data.transaction.to,
      data: data, // The encoded function call (your `input_data` from the JSON)
      value: parseEther("0"), // The amount of Ether to send with the transaction
      chainId: orderData.fulfillment_data.transaction.chain // The network ID (5 for Goerli in this case)
    };

    const hash = await walletClient.sendTransaction(transaction)

    console.log(hash)

  } catch (error) {
    console.error("sending tx: ", error)
  }
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

async function main(seller) {
  try {
    const orderData = await getBestOfferAndFulfill({
      seller,
      nftAddress: '0x28Ba8AF8C8730F4C39fb0Ac9779372183Fb4EAD9',
      tokenId: '112',
      collectionSlug: 'cyan-numbers'
    });

    sendTransaction({ orderData, seller })

  } catch (error) {
    console.error("main entry: ", error)
  }
}

main('0x04c1b9B656Ae90DcFF5D363884c1D812D6790F9a')






















// unused - keep for later
async function makeOffer({ nftAddress, offerer, amount, currency }) {
  const platformFee = parseInt(amount) * 0.025

  const order_parameters = {
    "offerer": offerer,
    "offer": [
      {
        "itemType": 1,
        "token": currency,
        "identifierOrCriteria": "0",
        "startAmount": parseEther(amount),
        "endAmount": parseEther(amount)
      }
    ],
    "consideration": [
      {
        "itemType": 4,
        "token": nftAddress,
        "identifierOrCriteria": "0",
        "startAmount": "1",
        "endAmount": "1",
        "recipient": offerer
      },
      {
        "itemType": 1,
        "token": currency,
        "identifierOrCriteria": "0",
        "startAmount": platformFee.toString(),
        "endAmount": platformFee.toString(),
        "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719"
      }
    ],
    "startTime": Math.floor(Date.now() / 1000).toString(),
    "endTime": Math.floor((Date.now() / 1000) + (7 * 24 * 60 * 60)).toString(),
    "orderType": 2,
    "zone": "0x000000e7Ec00e7B300774b00001314B8610022b8",
    "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "salt1": numberToHex(Math.floor(Math.random() * 99999999999999), { size: 32 }),
    "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
    "totalOriginalConsiderationItems": 2,
    "counter": 0
  }

  const signature = await walletClient.signTypedData({
    account: walletClient.account.address,
    domain: {
      name: "Open sea",
      versionId: 1,
      chainId: 5,
      verifyingContract: '0x00000000000000adc04c56bf30ac9d3c0aaf14dc'
    },
    types: {
      // too complicated
    },
    message: order_parameters
  });

  const protocol_address = "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC";

  const response = await fetch('https://testnets-api.opensea.io/v2/orders/goerli/seaport/offers', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      order_parameters,
      signature,
      protocol_address,
    }),
  });

  const data = await response.json();

  return data;
}