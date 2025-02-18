import type { ToolConfig } from "./allTools.js";
import {postSwapRouteV1} from "../src/kyperswap/aggregator";


import type { GetKyberSwapRouteArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const executeSwapTool: ToolConfig<GetKyberSwapRouteArgs> = {
  definition: {
    type: "function",
    function: {
      name: "execute_swap",
      description: "Execute a swap between 2 coins or tokens",
      parameters: {
        type: "object",
        properties: {
          token_from: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The token to use for the swap",
          },
          amount: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The amount to swap",
          },
          token_to: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The token to receive after the swap",
          },
        },
        required: ["token_from", "amount", "token_to"],
      },
    },
  },
  handler: async ({token_from, amount, token_to}) => {
    return await postSwapRouteV1(token_from, amount, token_to);
  },
};
