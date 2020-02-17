import MinerService from './services/Miner';

const state = {
    minerUpdateTimer: undefined,
    minerLoading: false,
    minerService: undefined,
    minerError: '',
    minerInfo: {},
    daemons: {},
    daemonStatus: {}
};

state.minerService = new MinerService();
export default state;
