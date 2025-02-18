import { ethers } from "ethers";
import { sonicBlazeTestnet} from "../viem/configureSonicChain";


function getProvider(): ethers.Provider {    
    // Replace this with a RPC of your choice
    const providerUrl = "https://rpc.blaze.soniclabs.com";
    const providerOptions = {
        chainId: 57054,
        name: 'Sonic Testnet'
    }
    return new ethers.JsonRpcProvider(providerUrl, providerOptions);
}

export function getSigner(): ethers.Signer {
    const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

    // Return a new Wallet instance which handles private keys directly  
    return new ethers.Wallet(PRIVATE_KEY, getProvider());
}