import type { ToolConfig } from "./allTools.js";
import {getSwapRouteV1} from "../src/kyperswap/aggregator";


import type { GetKyberSwapRouteArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getKyberSwapRouteTool: ToolConfig<GetKyberSwapRouteArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_swaproute",
      description: "Find the best amount to swap between 2 coins or tokens",
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
    return await getSwapRouteV1(token_from, amount, token_to);
  },
};
