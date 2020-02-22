<template>
    <v-layout
        row
        class="primary no-select"
        v-bind:class="{ 'lighten-1 elevation-2': !isMobile, 'mb-1': isMobile }">
        <div style="width: 4px;" v-bind:class="{
            'error': !isOnline,
            'success darken-1': isOnline
        }"/>
        <v-layout column class="pt-3">
            <v-layout row class="px-3 pb-2">
                <span class="title">
                    {{ daemon.name }}
                </span>
                <v-spacer/>
                <span v-if="!isMining" class="title" v-bind:class="{
                    'error--text': !isOnline,
                    'info--text': isOnline
                }">
                    {{ isOnline ? 'Online' : 'Offline' }}
                </span>
                <span v-else class="title success--text">
                    {{ hashrate }}
                </span>
            </v-layout>
            <v-layout row class="px-3 pb-2">
                <v-flex xs12 md12>
                    <v-layout column class="caption">
                        <v-layout row align-center>
                            <span>IP Address</span>
                            <v-spacer/>
                            <span class="font-weight-medium">{{ daemon.ipAddress }}</span>
                        </v-layout>
                        <v-layout row align-center>
                            <span>Mining Threads</span>
                            <v-spacer/>
                            <span class="font-weight-medium">{{ daemon.miningThreads }}</span>
                        </v-layout>
                        <v-layout row align-center>
                            <span>Version</span>
                            <v-spacer/>
                            <span class="font-weight-medium">{{ version || '-' }}</span>
                        </v-layout>
                        <v-layout row align-center>
                            <span>Height</span>
                            <v-spacer/>
                            <span class="font-weight-medium">{{ height || '-' }}</span>
                        </v-layout>
                        <v-layout row align-center>
                            <span>Connections</span>
                            <v-spacer/>
                            <span class="font-weight-medium">{{ connections || '-' }}</span>
                        </v-layout>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-divider dark/>
            <v-layout row align-center class="pr-2">
                <!--<v-btn
                    small
                    flat
                    :color="isMining ? 'error' : 'info'"
                    @click="changeMiningAction"
                    v-if="isOnline">
                    {{ `${isMining ? 'Stop' : 'Start'} Mining` }}
                </v-btn>-->
                <v-switch
                    dark
                    hide-details
                    color="accent"
                    class="ml-3 mt-0 py-0"
                    v-model="miningSwitch"
                    :label="isMining ? 'Mining' : 'Not Mining'"
                    v-if="isOnline">
                </v-switch>
                <v-spacer/>
                <v-btn
                    icon
                    small
                    flat
                    dark
                    class="ml-2 mr-0"
                    @click="editDaemon">
                    <v-icon size="16">
                        fas fa-pencil-alt
                    </v-icon>
                </v-btn>
                <v-btn
                    icon
                    small
                    flat
                    dark
                    class="ml-2 mr-0"
                    @click="removeDaemonConfirmDialog = true">
                    <v-icon size="16" >
                        fas fa-times
                    </v-icon>
                </v-btn>
            </v-layout>
        </v-layout>

        <v-dialog
            persistent
            max-width="400"
            v-model="removeDaemonConfirmDialog">
            <v-card class="primary lighten-1">
                <v-card-title>
                    <span class="title secondary--text">
                        {{ `Remove ${daemon.name}` }}
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-layout
                        column
                        align-start
                        class="subheading secondary--text">
                        <span>Are you sure you want to remove this miner?</span>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        flat
                        dark
                        color="info"
                        @click="removeDaemonConfirmDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn
                        flat
                        dark
                        color="error"
                        @click="confirmRemoveDaemon">
                        Remove
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'daemon',
    components: {},
    props: ['daemon', 'status', 'explorerHeight'],
    data () {
        return {
            removeDaemonConfirmDialog: false,
            loading: false
        };
    },
    computed: {
        ...mapState({
            explorerInfo: state => state.explorer.explorerInfo
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        isOnline () {

            return !!this.status && !!this.status.info;
        },
        isMining () {

            return this.isOnline && !!this.status.miningStatus && this.status.miningStatus.active;
        },
        miningSwitch: {
            get () {

                return this.isOnline && !!this.status.miningStatus && this.status.miningStatus.active;
            },
            set (value) {

                this.changeMiningAction();
            }
        },
        height () {

            if (!this.status || !this.status.info) {

                return;
            }

            return this.status.info.height;
        },
        version () {

            if (!this.status || !this.status.info) {

                return;
            }

            return `v${this.status.info.version}`;
        },
        updateAvailable () {

            return this.status && this.status.info ? this.status.info.update_available : false;
        },
        hashrate () {

            if (!this.isOnline || !this.isMining) {

                return;
            }

            let hashrate = this.status.miningStatus.speed;

            return `${hashrate} h/s`;
        },
        connections () {

            if (!this.isOnline) {

                return;
            }
            return `${this.status.info.incoming_connections_count} in, ${this.status.info.outgoing_connections_count} out`;
        },
        miningThreads () {

            if (!this.status || !this.status.info) {

                return this.daemon.miningThreads;
            }
            if (!this.isOnline || !this.status.miningStatus || !this.status.miningStatus.active) {

                return this.daemon.miningThreads;
            }
            return this.status.miningStatus.threads_count;
        }
    },
    methods: {
        ...mapActions({
            removeDaemon: 'miner/removeDaemon',
            startMining: 'miner/startMining',
            stopMining: 'miner/stopMining'
        }),
        editDaemon () {

            this.$emit('editDaemon', this.daemon);
        },
        confirmRemoveDaemon () {

            this.removeDaemonConfirmDialog = false;
            return this.removeDaemon(this.daemon.id);
        },
        changeMiningAction () {

            if (this.isMining) {

                return this.stopMiningClick();
            } else {

                return this.startMiningClick();
            }
        },
        startMiningClick () {

            return this.startMining(this.daemon).then(() => {

                this.$notify.success(`${this.daemon.name}: Mining started`);
            }).catch((err) => {

                this.$notify.error(`${this.daemon.name}: Error starting miner`);
            });
        },
        stopMiningClick () {

            return this.stopMining(this.daemon).then(() => {

                this.$notify.success(`${this.daemon.name}: Mining stopped`);
            }).catch((err) => {

                this.$notify.error(`${this.daemon.name}: Error stopping miner`);
            });
        },
        restartMining () {

            return this.stopMiningClick().then(() => {

                return this.startMiningClick();
            });
        }
    },
    watch: {
        daemon: {
            deep: true,
            handler () {

                if (this.daemon.miningThreads != this.miningThreads) {

                    this.restartMining();
                }
            }
        }
    }
};
</script>

<style>

</style>
