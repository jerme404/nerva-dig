import Vue from 'vue';

const mutations = {
    minerSetLoading: (state, isLoading) => {

        state.minerLoading = isLoading;
    },
    minerSetUpdateTimer: (state, updateTimer) => {

        state.minerUpdateTimer = updateTimer;
    },
    minerClearUpdateTimer: (state) => {

        if (state.minerUpdateTimer) {

            clearInterval(state.minerUpdateTimer);
            state.minerUpdateTimer = null;
        }
    },
    minerSetStatus: (state, status) => {

        Vue.set(state.daemonStatus, status.id, status.status);
    },
    minerSetError: (state, err) => {

        state.minerError = err;
    },
    minerSetDaemons: (state, daemons) => {

        state.daemons = daemons;
    },
    minerRemoveDaemon: (state, id) => {

        Vue.delete(state.daemons, id);
        Vue.delete(state.daemonStatus, id);
    }
};

export default mutations;
