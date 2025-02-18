import { getBalanceTool } from "./getBalance";
import { getWalletAddressTool } from "./getWalletAddress";
import { sendTransactionTool } from "./sendTransction";
import { deployErc20Tool } from "./deployERC20";
import { getPriceFeedTool } from "./getPriceFeed";
import {getKyberSwapRouteTool} from "./getKyberSwapRoute";
import {executeSwapTool} from "./executeSwap";
import {createLimitOrderTool} from "./createLimitOrder";
import {getSupportedPairsTool} from "./getSupportedPairs";
import {getAvailablePriceFeedsTool} from "./getAvailablePriceFeeds";
import {getAvailableTokensForSwapTool} from "./getAvailableTokensForSwap";
import {cancelLimitOrderTool} from "./cancelLimitOrder";

export interface ToolConfig<T = any> {
  /**
   * The definition of the tool.
   */
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };

  /**
   * The handler function that will be called when the tool is executed.
   */
  handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
  // == READ == \\
  /**
   * Get the balance of a wallet.
   */
  get_balance: getBalanceTool,
  /**
   * Get the connected wallet address.
   */
  get_wallet_address: getWalletAddressTool,

  // == WRITE == \\
  /**
   * Send a transaction with optional parameters.
   */
  send_transaction: sendTransactionTool,
  /**
   * Deploy an ERC20 token.
   */
  deploy_erc20: deployErc20Tool,
  /**
   * Get the price feed from Pyth Oracle
   */
  get_pricefeed: getPriceFeedTool,
  /**
   * Find the best amount to swap between 2 coins or tokens using KyberSwap
   */
   get_swaproute: getKyberSwapRouteTool,
  /**
   * Execute a swap between 2 coins or tokens
   */
   execute_swap: executeSwapTool,
  /**
   * Get the available price feeds in Pyth protocol.
   */
   get_availablepricefeeds: getAvailablePriceFeedsTool,
  /**
   * Get the available tokens to swap in KyberSwap.
   */
   get_availabletokensforswap: getAvailableTokensForSwapTool,
  
   /**
   * Get the available tokens to swap in KyberSwap.
   */
    // cancel_limitorder: cancelLimitOrderTool,
  //  /**
  //  * Create a limit order
  //  */
  //   create_limitorder: createLimitOrderTool,
  //   /**
  //  * Find the pairs available for making limit orders
  //  */
  //    get_supportedpairs: getSupportedPairsTool,
};
