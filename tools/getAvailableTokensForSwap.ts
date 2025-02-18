import type { ToolConfig } from "./allTools.js";
import {TOKENS_DICT} from '../src/constants/kyberSwap';


import type { GetSupportedPairsArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getAvailableTokensForSwapTool: ToolConfig<GetSupportedPairsArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_availabletokensforswap",
      description: "Get the available tokens to swap in KyberSwap.",
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await getAvailableTokens();
  },
};

async function getAvailableTokens() {
  const keys = Object.keys(TOKENS_DICT).join(", ");
  return keys;
}
