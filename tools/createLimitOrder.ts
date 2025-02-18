import type { ToolConfig } from "./allTools.js";
import {postCreateOrder} from "../src/kyperswap/limitorder";


import type { CreateLimitOrderArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const createLimitOrderTool: ToolConfig<CreateLimitOrderArgs> = {
  definition: {
    type: "function",
    function: {
      name: "create_limitorder",
      description: "Create a new limit order to exchange 2 different coins with defined amounts.",
      parameters: {
        type: "object",
        properties: {
          token_from: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The maker token to use for the limit order",
          },
          amount_from: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The amount for the maker token for the limit order",
          },
          token_to: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The taker token to receive after the execution of the order",
          },
          amount_to: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The amount for the taker token to receive in the order",
          },
          expiration: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The minutes for the expiration of the order",
          },
        },
        required: ["token_from", "amount_from", "token_to", "amount_to", "expiration"],
      },
    },
  },
  handler: async ({token_from, amount_from, token_to, amount_to, expiration}) => {
    return await postCreateOrder(token_from, amount_from, token_to, amount_to, expiration);
  },
};
