import { ethers } from "ethers";


function getProvider(): ethers.Provider {    
    // Replace this with a RPC of your choice
    const providerUrl = "https://rpc.soniclabs.com";
    const providerOptions = {
        chainId: 146,
        name: 'Sonic'
    }
    return new ethers.JsonRpcProvider(providerUrl, providerOptions);
}

export function getSigner(): ethers.Signer {
    const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

    // Return a new Wallet instance which handles private keys directly  
    return new ethers.Wallet(PRIVATE_KEY, getProvider());
}