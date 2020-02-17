import Vue from 'vue';
import { MinerConfig } from '@/config';

const actions = {
    explorerLoad: ({ commit, dispatch, state }) => {

        dispatch('getExplorerInfo');
        if (!state.explorerUpdateTimer) {

            let updateTimer = setInterval(() => {

                if (!state.explorerLoading) {

                    dispatch('getExplorerInfo');
                }

            }, MinerConfig.updateInterval);
            commit('explorerSetUpdateTimer', updateTimer);
        }
    },
    explorerUnload: ({ commit, state }) => {

        commit('explorerClearUpdateTimer');
        commit('explorerSetInfo', {});
    },
    getExplorerInfo: ({ commit, state }) => {

        commit('explorerSetLoading', true);
        return state.explorerService.getInfo().then((response) => {

            commit('explorerSetInfo', response);
            commit('explorerSetLoading', false);
        }).catch((err) => {

            commit('explorerSetError', err);
            commit('explorerSetLoading', false);
        });
    }
};

export default actions;
