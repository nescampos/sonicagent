import type { ToolConfig } from "./allTools.js";
import {PRICE_FEED_DICT, PYTH_SONIC_ADDRESS} from '../src/constants/priceFeeds';


import type { GetSupportedPairsArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getAvailablePriceFeedsTool: ToolConfig<GetSupportedPairsArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_availablepricefeeds",
      description: "Get the available price feeds in Pyth protocol.",
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await getPriceFeeds();
  },
};

async function getPriceFeeds() {
  const keys = Object.keys(PRICE_FEED_DICT).join(", ");
  return keys;
}
