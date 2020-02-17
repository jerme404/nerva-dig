import Vue from 'vue';
import Vuex from 'vuex';
import Explorer from './modules/Explorer';
import Miner from './modules/Miner';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        explorer: Explorer,
        miner: Miner
    },
});
