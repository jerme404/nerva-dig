<template>
    <v-layout
        column
        class="primary"
        v-bind:class="{ 'px-3 pb-3 pt-2': !isMobile }">

        <!--<v-layout
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
        </v-layout>-->
        <daemon-list/>

    </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import store from '@/store';

const DaemonList = () => import('./components/DaemonList');

export default {
    name: 'dashboard',
    components: {
        'daemon-list': DaemonList
    },
    computed: {
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        }
    }, 
    methods: {
        ...mapActions({
            loadMiner: 'miner/minerLoad'
        })
    },
    mounted () {

        this.loadMiner();
    }
};
</script>

<style>

</style>
