import axios from "axios";
import { LIMIT_ORDER_DOMAIN, CHAIN_ID} from "../constants/kyberSwap";


export async function getContracts() {
    const targetPath = `/read-ks/api/v1/configs/contract-address`;

    // Specify the chainId to query
    const targetPathConfig = {
        params: {
            chainId: CHAIN_ID,
        }
    };

    try {
        console.log(`\nGetting the LO contracts...`);
        const {data} = await axios.get(
            LIMIT_ORDER_DOMAIN+targetPath,
            targetPathConfig
        );

        console.log(`LO contracts:`);
        console.debug(data.data);

        return data.data;

    } catch (error) {
        throw(error);
    };
}