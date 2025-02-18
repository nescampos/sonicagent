import axios from "axios";
import { LIMIT_ORDER_DOMAIN, CHAIN_ID, TOKENS_DICT} from "../constants/kyberSwap";
import {getSigner} from "./signer";
import { CreateOrderUnsignedBody, postCreateOrderUnsigned } from "./postCreateOrdersUnsigned";
import { getContracts } from "./getContracts";
import { getTokenApproval } from "./approval";
import { getMakerActiveAmount } from "./getMakerActiveAmount";
import { postCancelOrderUnsigned, CancelOrderUnsignedBody } from "./postCancelOrderUnsigned";

interface CreateOrderSignedBody extends CreateOrderUnsignedBody {
    salt: string,
    signature: string
};

interface CancelOrderSignedBody extends CancelOrderUnsignedBody {
    signature: string
};

export async function postCreateOrder(token_from:string, amount_from:string, token_to:string, amount_to:string, expiration) {
    const targetPath = `/write/api/v1/orders`;


    const firstToken = TOKENS_DICT[token_from];
    // Get the ethers signer for signing the creation order
    const signer = getSigner();

    // Get the request body and the EIP712 order creation data
    const orderrequest = await postCreateOrderUnsigned(token_from, amount_from, token_to, amount_to, expiration);
    const unsignedOrderReqBody = orderrequest.requestBody;
    const unsignedOrderReturnData = orderrequest.returnedData;

    // Get the Maker current making amount to ensure contract has sufficient allowance across all orders
    const currentMakingAmount = await getMakerActiveAmount(firstToken);
    const newMakingAmount = Number(currentMakingAmount) + Number(unsignedOrderReqBody.makingAmount);

    // Get the LO contract address to interact with on-chain
    const limitOrderContract = (await getContracts()).latest;

    // Check if LO contract has sufficient allowance to spend makerAsset
    await getTokenApproval(
        firstToken.address,
        limitOrderContract,
        newMakingAmount
    );

    // Sign the EIP712 order creation
    const signature = await signer.signTypedData(
        unsignedOrderReturnData.domain,
        { Order: unsignedOrderReturnData.types.Order },
        unsignedOrderReturnData.message
    );

    // Structure the request to be sent in POST body
    const requestBody: CreateOrderSignedBody = {
        ...unsignedOrderReqBody,
        salt: unsignedOrderReturnData.message.salt,
        signature: signature
    };
    
    try {
        console.log(`\nPosting the create order...`)
        const {data} = await axios.post(
            LIMIT_ORDER_DOMAIN+targetPath,
            requestBody
        );

        console.log(`KyberSwap server response:`)
        return {
            message:data.value.message,
            orderId: data.value.data.id,
            success:true
        }
    } catch (error) {
        return {
            message:error,
            orderId: 0,
            success:false
        }
    };
};


export async function getSupportedPairs() {
    const targetPath = `/read-partner/api/v1/orders/pairs`;

    const targetPathConfig = {
        params: {
            chainId: CHAIN_ID,
        }
    };

    try {
        console.log(`\nGetting supported pairs on Sonic...`);
        const {data} = await axios.get(
            LIMIT_ORDER_DOMAIN+targetPath,
            targetPathConfig
        );
        
        console.log(`Supported pairs:`);
        console.debug(data.data.pairs);

        return data.data.pairs;

    } catch (error) {
        throw(error);
    };
};

export async function postCancelOrder(token_from:string, token_to:string) {
    const targetPath = `/write/api/v1/orders/cancel`;

    // Get the Maker signer instance to sign cancellation off-chain
    const signer = getSigner();

    // Get the request body and EIP712 unsigned message
    const orderrequest = await postCancelOrderUnsigned(token_from, token_to);
    const unsignedOrderReqBody = orderrequest.requestBody;
    const unsignedOrderReturnData = orderrequest.returnedData;

    // Sign the EIP712 cancellation order
    const signature = await signer.signTypedData(
        unsignedOrderReturnData.domain,
        { CancelOrder: unsignedOrderReturnData.types.CancelOrder },
        unsignedOrderReturnData.message
    );

    // Structure the request body to accompany the POST request
    const requestBody: CancelOrderSignedBody = {
        ...unsignedOrderReqBody,
        signature: signature
    };
    
    try {
        console.log(`\nPosting the cancellation order...`);
        const {data} = await axios.post(
            LIMIT_ORDER_DOMAIN+targetPath,
            requestBody,
            {headers: {Origin: 'https://kyberswap.com'}}
        );

        console.log(`KyberSwap server response:`);
        return {
            message:"success",
            success:true
        }

    } catch (error) {
        return {
            message:error,
            success:false
        }
    };
};