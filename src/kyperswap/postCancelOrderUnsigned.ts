import axios from "axios";
import { LIMIT_ORDER_DOMAIN, CHAIN_ID, TOKENS_DICT } from "../constants/kyberSwap";
import { getSigner } from "./signer";
import { getOrders } from "./getOrders";
import { EIP712TypedData } from "./EIP712";

export interface CancelOrderUnsignedBody {
    chainId: string,
    maker: string, 
    orderIds: number[]
};

export async function postCancelOrderUnsigned(token_from:string, token_to:string) {
    const targetPath = `/write/api/v1/orders/cancel-sign`;

    const firstToken = TOKENS_DICT[token_from];
    const secondToken = TOKENS_DICT[token_to];

    // Get the Maker address
    const signerAddress = await getSigner().getAddress();

    // Get the order ID to be cancelled
    const orders = await getOrders();
    const targetOrder = orders.filter(order => 
        order.maker.toLowerCase() == signerAddress.toLowerCase() &&
        order.makerAsset.toLowerCase() == firstToken.address.toLowerCase() &&
        order.takerAsset.toLowerCase() == secondToken.address.toLowerCase()
    );
    const targetOrderId = Number(targetOrder[0].id);

    // Structure the request body to accompany the POST request
    const requestBody: CancelOrderUnsignedBody = {
        chainId: CHAIN_ID,
        maker: signerAddress,
        orderIds: [targetOrderId]
    };

    console.debug(requestBody)

    try {
        console.log(`\nGetting the unsigned cancellation order...`);
        const {data} = await axios.post(
            LIMIT_ORDER_DOMAIN+targetPath,
            requestBody
        );

        console.log(`Unsigned cancellation order:`);
        console.debug(data.data.types)

        // Return the request body used and the EIP712 unsigned data
        return {
            requestBody: requestBody,
            returnedData: data.data
        };

    } catch (error) {
        throw(error);
    };
};