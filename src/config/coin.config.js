export default {
    coinName: 'NERVA',
    coinSymbol: 'XNV',
    coinUnitPlaces: 12,
    coinUriPrefix: 'nerva:',
    addressPrefix: 0x3800,
    integratedAddressPrefix: 0x7081,
    subAddressPrefix: 0x1080,
    blockTarget: 60,
    explorer: {
        api: 'https://us-central1-nerva-248022.cloudfunctions.net/nervaApi',
        txHashMask: 'https://getnerva.org/explorer/detail/<hash>',
        blockHashMask: 'https://getnerva.org/explorer/detail/<hash>'
    },
};
