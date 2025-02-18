import axios from "axios";
import { AGGREGATOR_DOMAIN, TOKENS_DICT} from "../constants/kyberSwap";
import {getSigner} from "./signer";

export async function getSwapRouteV1(token_from, amount, token_to) {
    // Get the path to be called
    const targetPath = `/sonic/api/v1/routes`;

    const firstToken = TOKENS_DICT[token_from];
    const secondToken = TOKENS_DICT[token_to];


    // Specify the call parameters (only the required params are specified here, see Docs for full list)
    const targetPathConfig = {
        params: {
            tokenIn: firstToken.address,
            tokenOut: secondToken.address,
            amountIn: Number(amount*10**firstToken.decimals).toString()
        }
    };

    // Call the API with axios to handle async calls
    try {
        console.log(`\nCalling [KyberSwap Aggregator V1] Get Swap Route...`);
        const {data} = await axios.get(
            AGGREGATOR_DOMAIN+targetPath,
            targetPathConfig
        )

        console.log(`[KyberSwap Aggregator V1] GET Response:`);
        //console.log(data);
        return (data.data.routeSummary.amountOut / 10**secondToken.decimals).toString();
    } catch (error) {
        return {
            success: false,
            message: error,
            // routerAddress: "",
            // message: `${error}`
        }
    };

};


export async function postSwapRouteV1(token_from, amount, token_to) {
    const targetPath = `/sonic/api/v1/routes`;
    const targetPathBuild = `/sonic/api/v1/route/build`;

    const firstToken = TOKENS_DICT[token_from];
    const secondToken = TOKENS_DICT[token_to];

    // Specify the call parameters (only the required params are specified here, see Docs for full list)
    const targetPathConfig = {
        params: {
            tokenIn: firstToken.address,
            tokenOut: secondToken.address,
            amountIn: Number(amount*10**firstToken.decimals).toString()
        }
    };

    
    const {data} = await axios.get(
        AGGREGATOR_DOMAIN+targetPath,
        targetPathConfig
    )
    const routeSummary = data.data.routeSummary;

    // Get the signer's address
    const signer = getSigner()
    const signerAddress = await signer.getAddress();

    // Configure the request body (refer to Docs for the full list)
    const requestBody = {
        routeSummary: routeSummary,
        sender: signerAddress,
        recipient: signerAddress,
        slippageTolerance: 10 //0.1%
    }

    // Call the API with axios to handle async calls
    try {
        console.log(`\nCalling [KyberSwap Aggregator V1] Post Swap Route For Encoded Data...`);
        const {data} = await axios.post(
            AGGREGATOR_DOMAIN+targetPathBuild,
            requestBody
        );
        console.log(`[KyberSwap Aggregator V1] POST Response:`);
        return data.message;
    } catch (error) {
        return {
            success: false,
            message: error,
            // routerAddress: "",
            // message: `${error}`
        }
    };
}