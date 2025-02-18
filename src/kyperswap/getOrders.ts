import axios from "axios";
import { LIMIT_ORDER_DOMAIN, CHAIN_ID, TOKENS_DICT} from "../constants/kyberSwap";
import { Order } from "./order";

export async function getOrders() {
    const targetPath = `/read-partner/api/v1/orders`;

    const firstToken = TOKENS_DICT[token_from];
    const secondToken = TOKENS_DICT[token_to];

    // Specify the chain and token pair being queried
    const targetPathConfig = {
        params: {
            chainId: CHAIN_ID,
            makerAsset: firstToken.address, // USDC
            takerAsset: secondToken.address  // KNC  
        }
    };

    try {
        console.log(`\nGetting list of orders...`);
        const {data} = await axios.get(
            LIMIT_ORDER_DOMAIN+targetPath,
            targetPathConfig
        );

        console.log(`List of orders:`);
        console.debug(data.data.orders);

        // Return the orders for the token pair
        return data.data.orders;

    } catch (error) {
        throw(error);
    };
};