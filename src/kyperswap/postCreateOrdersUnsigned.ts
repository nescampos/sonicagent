import axios from "axios";
import { LIMIT_ORDER_DOMAIN, CHAIN_ID, TOKENS_DICT} from "../constants/kyberSwap";
import { getSigner } from "./signer";
import { EIP712TypedData } from "./EIP712";

export interface CreateOrderUnsignedBody {
    chainId: string,
    makerAsset: string,
    takerAsset: string,
    maker: string,
    receiver?: string,
    allowedSenders?: string[],
    makingAmount: string,
    takingAmount: string,
    feeRecipient?: string,
    makerTokenFeePercent?: string,
    expiredAt: number
}

export async function postCreateOrderUnsigned(token_from, amount_from, token_to, amount_to, minutes): Promise<{requestBody: CreateOrderUnsignedBody, returnedData: EIP712TypedData}> {
    const targetPath = `/write/api/v1/orders/sign-message`;

    const firstToken = TOKENS_DICT[token_from];
    const secondToken = TOKENS_DICT[token_to];

    // Get the address of the Maker
    const signerAddress = await getSigner().getAddress();

    // Structure the request to be sent in POST body
    const requestBody: CreateOrderUnsignedBody = {
        chainId: CHAIN_ID,
        makerAsset: firstToken.address, 
        takerAsset: secondToken.address, 
        maker: signerAddress,
        allowedSenders: [signerAddress], // Included so that only our account can fill this order
        makingAmount: Number(amount_from*10**firstToken.decimals).toString(), // 0.01 USDC
        takingAmount: Number(amount_to*10**firstToken.decimals).toString(), // 0.02 KNC
        expiredAt: Math.floor(Date.now() / 1000) + 60 * minutes // 60mins
    };

    //console.debug(requestBody);

    try {
        console.log(`\nGetting the unsigned creation order...`);
        const {data} = await axios.post(
            LIMIT_ORDER_DOMAIN+targetPath,
            requestBody
        );

        console.log(`Unsigned creation order:`);
        //console.debug(data.data);

        // Return the request used and the EIP712 unsigned data
        return {
            requestBody: requestBody,
            returnedData: data.data
        };

    } catch (error) {
        throw(error);
    };
};

