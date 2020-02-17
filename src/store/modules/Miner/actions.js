import Vue from 'vue';
import { MinerConfig } from '@/config';

const actions = {
    minerLoad: ({ commit, dispatch, state }) => {

        state.minerService.getDaemons().then((daemons) => {

            if (Object.keys(daemons).length > 0) {

                commit('minerSetDaemons', daemons);
            }
            dispatch('getMinerInfo');
        }).catch((err) => {


        });

        if (!state.minerUpdateTimer) {

            let updateTimer = setInterval(() => {

                if (!state.minerLoading) {

                    dispatch('getMinerInfo');
                }

            }, MinerConfig.updateInterval);
            commit('minerSetUpdateTimer', updateTimer);
        }
    },
    minerUnload: ({ commit, state }) => {

        commit('minerClearUpdateTimer');
        commit('mineretInfo', {});
    },
    getMinerInfo: ({ commit, state }, daemon) => {

        let daemons = [];

        if (daemon) {

            daemons.push(daemon);
        } else {

            daemons = Object.values(state.daemons);
        }

        if (daemons.length == 0) {

            console.log('no daemons');
            return;
        }

        daemons.forEach((daemon) => {

            let daemonStatus = {},
                daemonAddress = `${daemon.ipAddress}:${daemon.port}`;
            state.minerService.getInfo(daemonAddress).then((response) => {

                console.log(response);
                daemonStatus.info = response;
                return state.minerService.getMiningStatus(daemonAddress);
            }).then((response) => {

                console.log(response);
                daemonStatus.miningStatus = response;
                commit('minerSetStatus', {
                    id: daemon.id,
                    status: daemonStatus
                });
            }).catch((err) => {

                console.log(err);
                commit('minerSetStatus', { id: daemon.id, status: {} });
            });
        });
    },
    saveDaemon: ({ commit, dispatch, state }, daemon) => {

        if (!daemon.id) {

            daemon.id = Date.now().toString();
        }

        let daemons = {...state.daemons};
        daemons[daemon.id] = daemon;
        return state.minerService.setDaemons(daemons).then(() => {

            commit('minerSetDaemons', daemons);
            dispatch('getMinerInfo', daemon);
        }).catch((err) => {

            return Promise.reject(err);
        });
    },
    removeDaemon: ({ commit, state }, id) => {

        let daemons = {...state.daemons};
        delete daemons[id];
        return state.minerService.setDaemons(daemons).then(() => {

            commit('minerRemoveDaemon', id);
        }).catch((err) => {

            return Promise.reject(err);
        });
    },
    startMining: ({ commit, dispatch, state }, daemon) => {

        return state.minerService.startMining({
            daemonAddress: `${daemon.ipAddress}:${daemon.port}`,
            miningThreads: daemon.miningThreads,
            walletAddress: daemon.walletAddress
        }).then((response) => {

            return dispatch('getMinerInfo', daemon);
        }).catch((err) => {

            dispatch('getMinerInfo', daemon);
            return Promise.reject(err);
        });
    },
    stopMining: ({ commit, dispatch, state }, daemon) => {

        return state.minerService.stopMining({
            daemonAddress: `${daemon.ipAddress}:${daemon.port}`
        }).then((response) => {

            return dispatch('getMinerInfo', daemon);
        }).catch((err) => {

            dispatch('getMinerInfo', daemon);
            return Promise.reject(err);
        });
    }
};

export default actions;
