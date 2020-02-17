import Utils from '@/utils';

const getters = {
    daemonList: (state) => {

        let daemonList = Object.values(state.daemons);
        
        return daemonList;
    },
    totalHashrate: (state) => {

        return totalHashrate(Object.values(state.daemonStatus));
    },
    hashrateDisplay: (state) => {

        let hashrate = totalHashrate(Object.values(state.daemonStatus));
        return `${Utils.displayUnits(hashrate, 2)}H/s`;
    }
};

const totalHashrate = function (daemons) {

    return daemons.reduce((total, daemon) => {

        if (daemon.miningStatus && daemon.miningStatus.speed) {

            total += daemon.miningStatus.speed;
        }
        return total;
    }, 0);
};
export default getters;
