import { defineChain } from 'viem'

export const sonicBlazeTestnet = defineChain({
    id: 57054,
    name: 'Sonic Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Sonic',
      symbol: 'S',
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.blaze.soniclabs.com'],
        webSocket: ['wss://sonic-blaze-rpc.publicnode.com'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://testnet.soniclabs.com/' },
    },
  })