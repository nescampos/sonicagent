import type { ToolConfig } from "./allTools.js";
import { ethers } from 'ethers';
import PythAbi from '@pythnetwork/pyth-sdk-solidity/abis/IPyth.json' assert { type: 'json' };
import {PRICE_FEED_DICT, PYTH_SONIC_ADDRESS} from '../src/constants/priceFeeds';


import type { GetPriceFeedArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getPriceFeedTool: ToolConfig<GetPriceFeedArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_pricefeed",
      description: "Get the price feed of a specific pair",
      parameters: {
        type: "object",
        properties: {
          pair: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The pair to get the price feed from",
          },
        },
        required: ["pair"],
      },
    },
  },
  handler: async ({ pair }) => {
    return await getPairValue(pair);
  },
};

async function getPairValue(pair: string) {
  const provider = ethers.getDefaultProvider('https://rpc.soniclabs.com');
  const contract = new ethers.Contract(PYTH_SONIC_ADDRESS, PythAbi, provider);
  const priceId = PRICE_FEED_DICT[pair];
  console.log(`Querying the price feed for ${pair} with Pyth in the address ${priceId}`)
  const age = '60';
  const [price, conf, expo, timestamp] = await contract.getPriceNoOlderThan(priceId, age);
  return price;
}
