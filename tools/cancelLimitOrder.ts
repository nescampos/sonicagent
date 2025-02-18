import type { ToolConfig } from "./allTools.js";
import {postCancelOrder} from "../src/kyperswap/limitorder";


import type { CancelLimitOrderArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const cancelLimitOrderTool: ToolConfig<CancelLimitOrderArgs> = {
  definition: {
    type: "function",
    function: {
      name: "cancel_limitorder",
      description: "Cancel a limit order to exchange 2 different coins.",
      parameters: {
        type: "object",
        properties: {
          token_from: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The maker token to use for the limit order",
          },
          token_to: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The taker token to receive after the execution of the order",
          },
        },
        required: ["token_from", "token_to"],
      },
    },
  },
  handler: async ({token_from, token_to}) => {
    return await postCancelOrder(token_from, token_to);
  },
};
