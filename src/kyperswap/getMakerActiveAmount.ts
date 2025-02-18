import axios from "axios";
import { LIMIT_ORDER_DOMAIN, TOKENS_DICT, CHAIN_ID} from "../constants/kyberSwap";
import { getSigner } from "./signer";
import { OpenOrder } from "./openOrder";

export async function getMakerActiveAmount(token_from): Promise<OpenOrder[]> {
    const targetPath = `/read-ks/api/v1/orders/active-making-amount`;

    const signer = getSigner();
    const signerAddress = await signer.getAddress();

    const firstToken = TOKENS_DICT[token_from];

    const targetPathConfig = {
        params: {
            chainId: CHAIN_ID,
            makerAsset: firstToken.address,
            maker: signerAddress
        }
    };

    try {
        console.log(`\nGetting maker active making amount for ${firstToken.symbol}...`)
        const {data} = await axios.get(
            LIMIT_ORDER_DOMAIN+targetPath,
            targetPathConfig
        );
        
        console.log(`Maker (${signerAddress}) active making amount:`)
        console.debug(data.data.activeMakingAmount);

        return data.data.activeMakingAmount;

    } catch (error) {
        throw(error);
    };
};