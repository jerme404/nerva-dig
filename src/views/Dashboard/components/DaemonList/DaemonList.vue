<template>
    <v-layout column>
        <v-layout column v-if="daemons.length > 0">
            <v-layout
                row
                shrink
                align-center
                class="px-3 py-3 no-select title secondary--text">
                <span>{{ `Miners (${daemons.length})`}}</span>
                <v-spacer/>
                <!--<span class="title info--text">{{ `${totalHashrate} h/s` }}</span>
                <v-spacer/>-->
                <v-btn
                    dark
                    outline
                    color="info"
                    class="ma-0"
                    @click="addMiner">
                    <v-icon size="16" color="info" class="mr-2">
                        fas fa-plus
                    </v-icon>
                    Add Miner
                </v-btn>
            </v-layout>
            <v-layout row shrink wrap>
                <v-flex
                    xs12
                    sm6
                    md4
                    lg4
                    d-flex
                    v-bind:class="{ 'pa-2': !isMobile }"
                    v-for="(daemon, index) in daemons"
                    :key="index">
                    <daemon
                        :daemon="daemon"
                        :status="daemonStatus[daemon.id]"
                        :explorerHeight="explorerHeight"
                        @editDaemon="editMiner"/>
                </v-flex>
            </v-layout>

        </v-layout>

        <v-layout
            column
            align-center
            justify-center
            class="py-3 no-select"
            v-else-if="daemons.length == 0">
            <span class="title secondary--text pb-3">
                No miners
            </span>
            <span class="subheading secondary--text font-weight-light">
                You haven't added any miners yet.
            </span>
            <span class="subheading secondary--text font-weight-light pb-3">
                Add one to start mining.
            </span>
            <v-btn
                dark
                outline
                class="secondary--text"
                @click="addMiner">
                Add Miner
            </v-btn>
        </v-layout>

        <v-dialog persistent v-model="addEditMinerDialog.show" max-width="500" lazy>
            <v-card dark class="primary" v-if="addEditMinerDialog.show">
                <v-card-title>
                    <span class="title">
                        {{`${addEditMinerDialog.editMode ? 'Edit' : 'Add'} Miner`}}
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap align-center>
                        <v-flex xs8 class="pr-2 pb-4">
                            <v-text-field
                                v-model="minerToEdit.name"
                                dark
                                hide-details
                                color="#FAFAFA"
                                label="Miner Name"
                                v-if="addEditMinerDialog.editMode">
                            </v-text-field>
                            <v-text-field
                                v-model="newMiner.name"
                                dark
                                hide-details
                                color="#FAFAFA"
                                label="Miner Name"
                                v-else>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs4 class="pb-4">
                            <v-text-field
                                v-model="minerToEdit.miningThreads"
                                dark
                                hide-details
                                type="number"
                                min="1"
                                color="#FAFAFA"
                                label="Mining Threads"
                                v-if="addEditMinerDialog.editMode">
                            </v-text-field>
                            <v-text-field
                                v-model="newMiner.miningThreads"
                                dark
                                hide-details
                                type="number"
                                min="1"
                                color="#FAFAFA"
                                label="Mining Threads"
                                v-else>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs8 class="pr-2 pb-3">
                            <v-text-field
                                v-model="minerToEdit.ipAddress"
                                dark
                                hide-details
                                prefix="http://"
                                color="#FAFAFA"
                                label="Daemon Address"
                                v-if="addEditMinerDialog.editMode">
                            </v-text-field>
                            <v-text-field
                                v-model="newMiner.ipAddress"
                                dark
                                hide-details
                                prefix="http://"
                                color="#FAFAFA"
                                label="Daemon Address"
                                v-else>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs4 class='pb-3'>
                            <v-text-field
                                v-model="minerToEdit.port"
                                dark
                                hide-details
                                type="number"
                                prefix=":"
                                color="#FAFAFA"
                                label="Port"
                                v-if="addEditMinerDialog.editMode">
                            </v-text-field>
                            <v-text-field
                                v-model="newMiner.port"
                                dark
                                hide-details
                                type="number"
                                prefix=":"
                                color="#FAFAFA"
                                label="Port"
                                v-else>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 class="pb-4">
                            <v-text-field
                                v-model="minerToEdit.walletAddress"
                                dark
                                clearable
                                hide-details
                                color="#FAFAFA"
                                label="Wallet Address"
                                v-if="addEditMinerDialog.editMode">
                            </v-text-field>
                            <v-text-field
                                v-model="newMiner.walletAddress"
                                dark
                                clearable
                                hide-details
                                color="#FAFAFA"
                                label="Wallet Address"
                                v-else>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-layout row align-center>
                        <v-spacer/>
                        <v-btn
                            flat
                            color="error"
                            @click="minerDialogCancel">
                            Cancel
                        </v-btn>
                        <v-btn
                            flat
                            color="success darken-1"
                            :disabled="!minerDialogValid"
                            @click="minerDialogConfirm">
                            {{ `${addEditMinerDialog.editMode ? 'Update' : 'Add'}` }}
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { CoinConfig, MinerConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';

const Daemon = () => import('./components/Daemon');

export default {
    name: 'daemonList',
    components: {
        'daemon': Daemon
    },
    props: {},
    data () {
        return {
            coinConfig: CoinConfig,
            addEditMinerDialog: {
                show: false,
                editMode: false
            },
            newMiner: {
                name: '',
                ipAddress: '',
                port: '',
                walletAddress: '',
                miningThreads: 1
            },
            minerToEdit: undefined
        };
    },
    computed: {
        ...mapGetters({
            daemons: 'miner/daemonList',
            totalHashrate: 'miner/totalHashrate'
        }),
        ...mapState({
            explorerInfo: state => state.explorer.explorerInfo,
            //daemons: state => state.miner.daemons,
            daemonStatus: state => state.miner.daemonStatus
        }),
        explorerHeight () {

            return this.explorerInfo ? this.explorerInfo.height : undefined;
        },
        walletHeight () {

            return this.walletInfo ? this.walletInfo.height : undefined;
        },
        daemonSyncPercent () {

            if (!this.explorerHeight || !this.walletHeight) {

                return 0;
            }

            return Math.floor((this.walletHeight / this.explorerHeight) * 100);
        },
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        minerDialogValid () {

            if (this.addEditMinerDialog.editMode) {

                if (this.minerToEdit.ipAddress == '' || this.minerToEdit.ipAddress.split('.').length < 4) {

                    return false;
                }
                if (this.minerToEdit.walletAddress == '') {

                    return false;
                }
            } else {

                if (this.newMiner.ipAddress == '' || this.newMiner.ipAddress.split('.').length < 4) {

                    return false;
                }
                if (this.newMiner.walletAddress == '') {

                    return false;
                }
            }
            return true;
        }
    },
    methods: {
        ...mapActions({
            loadMiner: 'miner/minerLoad',
            saveMiner: 'miner/saveDaemon',
            removeMiner: 'miner/removeDaemon',
            updateMiner: 'miner/updateDaemon'
        }),
        addMiner () {

            this.newMiner = {
                name: '',
                ipAddress: '',
                port: MinerConfig.defaultRpcPort,
                walletAddress: this.newMiner.walletAddress,
                miningThreads: this.newMiner.miningThreads
            };
            this.addEditMinerDialog = {
                show: true,
                editMode: false
            };
        },
        editMiner (minerToEdit) {

            this.minerToEdit = minerToEdit;
            this.addEditMinerDialog = {
                show: true,
                editMode: true
            };
        },
        saveNewMiner () {

            return this.saveMiner(this.newMiner).then(() => {

                this.addEditMinerDialog = {
                    show: false,
                    editMode: false
                };
            }).catch((err) => {

                this.addEditMinerDialog = {
                    show: false,
                    editMode: false
                };
                this.$notify.error('Error adding miner');
            });
        },
        saveUpdatedMiner () {

            return this.saveMiner(this.minerToEdit).then(() => {

                this.minerToEdit = undefined;
                this.addEditMinerDialog = {
                    show: false,
                    editMode: false
                };
            }).catch((err) => {

                this.minerToEdit = undefined;
                this.addEditMinerDialog = {
                    show: false,
                    editMode: false
                };
                this.$notify.error('Error updating miner');
            });
        },
        minerDialogCancel () {

            this.minerToEdit = undefined;
            this.addEditMinerDialog = {
                show: false,
                editMode: false
            };
        },
        minerDialogConfirm () {

            if (this.addEditMinerDialog.editMode) {

                return this.saveUpdatedMiner();
            }
            return this.saveNewMiner();
        },
    },
    mounted () {

        this.loadMiner();
    }
};
</script>

<style>

</style>
