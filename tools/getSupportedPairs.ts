import type { ToolConfig } from "./allTools.js";
import {getSupportedPairs} from "../src/kyperswap/limitorder";


import type { GetSupportedPairsArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getSupportedPairsTool: ToolConfig<GetSupportedPairsArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_supportedpairs",
      description: "Find the pairs available for making limit orders",
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await getSupportedPairs();
  },
};
