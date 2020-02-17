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
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
        ...mapState({}),
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
