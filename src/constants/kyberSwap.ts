export const AGGREGATOR_DOMAIN = `https://aggregator-api.kyberswap.com`;

interface Token {
    address: string,
    decimals: number,
    symbol?: string,
    name?: string
}

export const TOKENS_DICT = {
    "S": {address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',decimals: 18,symbol: 'S',name: 'Sonic'},
    "ANON":{address: '0x79bbF4508B1391af3A0F4B30bb5FC4aa9ab0E07C',decimals: 18,symbol: 'ANON',name: 'HeyAnon'},
    "AG":{address: '0x005851f943ee2957B1748957F26319e4f9EdeBC1',decimals: 18,symbol: 'AG',name: 'Silver'},
    "EURC":{address: '0xe715cba7b5ccb33790cebff1436809d36cb17e57',decimals: 6,symbol: 'EURC',name: 'EURC'},
    "USDC": {address: '0x29219dd400f2Bf60E5a23d13Be72B486D4038894',decimals: 6,symbol: 'USDC.e',name: 'USDC.e'}
};
