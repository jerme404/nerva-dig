import Axios from 'axios';
import { MinerConfig } from '@/config';

const endpoints = {
    getInfo: 'get_info',
    miningStatus: 'mining_status',
    startMining: 'start_mining',
    stopMining: 'stop_mining'
};

const LS_NODE_LIST = 'nodeList';

export default class MinerService {

    constructor () {

    };

    getDaemons () {

        return new Promise((resolve, reject) => {

            let daemonList = localStorage.getItem(LS_NODE_LIST);
            if (daemonList) {
                try {

                    let daemons = JSON.parse(atob(daemonList));
                    return resolve(daemons);
                } catch (err) {

                    return reject(err);
                }
            }
            resolve({});
        });
    };
    setDaemons (nodes) {

        return new Promise((resolve, reject) => {

            try {

                let daemonList = btoa(JSON.stringify(nodes));
                localStorage.setItem(LS_NODE_LIST, daemonList);
                resolve(nodes);
            } catch (err) {

                reject(err);
            }
        });
    };

    getInfo (daemonAddress) {

        return this.apiRequest({ url: `${daemonAddress}/${endpoints.getInfo}` });
    };

    getMiningStatus (daemonAddress) {

        return this.apiRequest({ url: `${daemonAddress}/${endpoints.miningStatus}` });
    };

    startMining ({ daemonAddress, miningThreads, walletAddress }) {

        let url = `${daemonAddress}/${endpoints.startMining}`;
        let body = {
            do_background_mining: false,
            ignore_battery: false,
            miner_address: walletAddress,
            threads_count: miningThreads
        };
        return this.apiRequest({ url: url, body: body });
    };

    stopMining ({ daemonAddress }) {

        let url = `${daemonAddress}/${endpoints.stopMining}`;
        return this.apiRequest({ url: url });
    };

    apiRequest ({ url, params, body }) {

        if (!url.toLowerCase().startsWith('http')) {

            url = `http://${url}`;
        }

        return Axios({
            method: 'post',
            url: url,
            params: params,
            data: body
        }).then((response) => {

            if (!response.data) {

                return Promise.reject({ errorMessage: 'No data returned in response' });
            }

            if (response.data.error) {

                return Promise.reject(response.data.error);
            }

            return Promise.resolve(response.data);
        }).catch((err) => {

            return Promise.reject(err);
        });
    };
};
