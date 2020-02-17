import { CoinConfig } from '@/config';
import Utils from '@/utils';

const getters = {
    netHashDisplay: (state) => {

        if (!state.explorerInfo || !state.explorerInfo.difficulty) {

            return;
        }
        return Utils.hashrateDisplay(state.explorerInfo.difficulty);
    },
    netHash: (state) => {

        if (!state.explorerInfo || !state.explorerInfo.difficulty) {

            return;
        }
        return Utils.hashrateFromDiff(state.explorerInfo.difficulty);
    }
};

export default getters;
