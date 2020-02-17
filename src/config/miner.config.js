export default {
    updateInterval: 45000, // ms
    // Default remote RPC daemon config.
    defaultRpcPort: 17566,
    daemon: {
        rpcAddress: 'http://192.168.1.122:17566',
        jsonRpc: 'json_rpc'
    },
    explorer: {
        api: 'https://us-central1-nerva-248022.cloudfunctions.net/nervaApi'
    },
    tagline: 'Nerva Miner'
};
