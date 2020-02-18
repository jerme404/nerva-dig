<template>
    <v-app class="primary">
        <v-toolbar
            app
            fixed
            flat
            color="primary lighten-1 elevation-1">
            <nav-top app :isMobile="isMobile"></nav-top>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height class="pa-0 primary darken-1">
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer
            fixed
            flat
            height="auto"
            color="primary lighten-1 elevation-1"
            v-if="daemons.length > 0">
            <v-layout column>
                <v-divider dark/>
                <v-layout
                    row
                    wrap
                    align-center
                    class="px-3 no-select secondary--text primary lighten-1"
                    v-bind:class="{ 'py-3': !isMobile, 'py-2': isMobile }"
                    v-if="daemons.length > 0">
                    <v-flex xs6 md3 v-if="!isMobile">
                        <v-layout
                            column
                            align-center
                            v-bind:class="{ 'align-center': isMobile }">
                            <span class="caption font-weight-medium">Network Height</span>
                            <span class="title info--text">{{ explorerHeight || '-' }}</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 md3>
                        <v-layout
                            column
                            align-center
                            v-bind:class="{ 'align-center': isMobile }">
                            <span class="caption font-weight-medium">Network Hashrate</span>
                            <span class="title info--text">{{ netHashDisplay || '-' }}</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 md3>
                        <v-layout
                            column
                            align-center
                            v-bind:class="{ 'align-center': isMobile }">
                            <span class="caption font-weight-medium">My Hashrate</span>
                            <span class="title info--text">{{ hashrateDisplay || '-' }}</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 md3 v-if="!isMobile">
                        <v-layout
                            column
                            align-center
                            v-bind:class="{ 'align-center': isMobile }">
                            <span class="caption font-weight-medium">Est. Blocks/Day</span>
                            <span class="title info--text">{{ blocksPerDay || '-' }}</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
import { CoinConfig, MinerConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';
const NavTop = () => import('@/components/NavTop');

export default {
    name: 'App',
    components: {
        'nav-top': NavTop
    },
    data () {
        return {};
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
        }
    },
    mounted () {

        this.loadExplorer();
    },
    methods: {
        ...mapActions({
            loadExplorer: 'explorer/explorerLoad',
            unloadExplorer: 'explorer/explorerUnload'
        })
    }
};
</script>

<style>
body {
    background-color: #2C3033;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #E7E8E9;
    font-size: 16px;
    padding: 0px;
    margin: 0px;
}
.font-mono {
    font-family: 'B612 Mono', monospace !important;
}
.no-select {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -o-user-select: none;
    -moz-user-select: none;
}
.cursor-pointer {
    cursor: pointer;
}
.cursor-default {
    cursor: default;
}
.row-divider {
    box-shadow: 0px -1px 0px 0px rgba(102,102,102,0.43) inset;
}
.nerva-gradient {
    background-image: linear-gradient( 135deg, rgba(85, 168, 191, 1) 0%, rgba(99, 88, 145, 1) 100%);
}
.wen-toast {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 16px;
    background: #191919 !important;
    max-width: calc(100vw - 32px);
    user-select: none;
    word-wrap: break-word;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -o-user-select: none;
    -moz-user-select: none;
}
.wen-toast-info {
    box-shadow: 3px 0px 0px 0px #39A0ED inset;
}
.wen-toast-success {
    box-shadow: 3px 0px 0px 0px #0EB384 inset;
}
.wen-toast-error {
    box-shadow: 3px 0px 0px 0px #F2555A inset;
}
</style>
