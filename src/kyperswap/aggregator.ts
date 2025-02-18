import axios from "axios";
import { AGGREGATOR_DOMAIN, TOKENS_DICT} from "../constants/kyberSwap";

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