<template>
    <v-layout
        column
        class="primary"
        v-bind:class="{ 'pa-3': !isMobile }">

        <v-layout
            row
            wrap
            shrink
            class="px-3 elevation-1 no-select"
            v-bind:class="{ 'primary lighten-1': !isMobile }"
            v-if="daemons.length > 0">
            <v-flex xs6 md3>
                <v-layout
                    column
                    align-start
                    class="py-3"
                    v-bind:class="{ 'align-center': isMobile }">
                    <span class="caption">Network Height</span>
                    <span class="title">{{ explorerHeight || '-' }}</span>
                </v-layout>
            </v-flex>
            <v-flex xs6 md3>
                <v-layout
                    column
                    align-start
                    class="py-3"
                    v-bind:class="{ 'align-center': isMobile }">
                    <span class="caption">Network Hashrate</span>
                    <span class="title">{{ netHashDisplay || '-' }}</span>
                </v-layout>
            </v-flex>
            <v-flex xs6 md3>
                <v-layout
                    column
                    align-start
                    class="py-3"
                    v-bind:class="{ 'align-center': isMobile }">
                    <span class="caption">My Hashrate</span>
                    <span class="title">{{ hashrateDisplay || '-' }}</span>
                </v-layout>
            </v-flex>
            <v-flex xs6 md3>
                <v-layout
                    column
                    align-start
                    class="py-3"
                    v-bind:class="{ 'align-center': isMobile }">
                    <span class="caption">Est. Blocks/Day</span>
                    <span class="title">{{ blocksPerDay || '-' }}</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <daemon-list/>

    </v-layout>
</template>

<script>
import { CoinConfig, MinerConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';

const DaemonList = () => import('./components/DaemonList');

export default {
    name: 'dashboard',
    components: {
        'daemon-list': DaemonList
    },
    props: {},
    data () {
        return {
            coinConfig: CoinConfig,
        };
    },
    computed: {
        ...mapGetters({
            daemons: 'miner/daemonList',
            hashrateDisplay: 'miner/hashrateDisplay',
            totalHashrate: 'miner/totalHashrate',
            netHashDisplay: 'explorer/netHashDisplay',
            netHash: 'explorer/netHash'
        }),
        ...mapState({
            explorerInfo: state => state.explorer.explorerInfo,
            daemonStatus: state => state.miner.daemonStatus
        }),
        explorerHeight () {

            return this.explorerInfo ? this.explorerInfo.height : undefined;
        },
        estSolveTime () {

            if (!this.totalHashrate || !this.netHash) {

                return;
            }
            let hashPercent = (this.totalHashrate / this.netHash);
            return hashPercent;
        },
        blocksPerDay () {

            let hashPercent = (this.totalHashrate / this.netHash);
            return (hashPercent * 1440).toFixed(0);
        },
        hashPercent () {

            if (!this.totalHashrate || !this.netHash) {

                return;
            }
            let hashPercent = (this.totalHashrate / this.netHash) * 100;
            return hashPercent.toFixed(2);
        },
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        newMinerValid () {

            if (this.newMiner.ipAddress == '' || this.newMiner.ipAddress.split('.').length < 4) {

                return false;
            }
            if (this.newMiner.walletAddress == '') {

                return false;
            }
            return true;
        }
    },
    methods: {
        ...mapActions({
            loadMiner: 'miner/minerLoad',
            addMiner: 'miner/addDaemon',
            removeMiner: 'miner/removeDaemon',
            updateMiner: 'miner/updateDaemon'
        }),
        showAddMinerDialog () {

            this.newMiner = {
                name: '',
                ipAddress: '',
                port: MinerConfig.defaultRpcPort,
                walletAddress: this.newMiner.walletAddress,
                miningThreads: this.newMiner.miningThreads
            };
            this.addMinerDialog = true;
        },
        addNewMiner () {

            return this.addMiner(this.newMiner).then(() => {

                this.addMinerDialog = false;
            }).catch((err) => {

                this.addMinerDialog = false;
                this.$notify.error('Error adding miner');
            });
        }
    },
    mounted () {

        this.loadMiner();
    }
};
</script>

<style>

</style>
