<template>
    <v-layout row grow class="no-select">
        <v-flex xs12 xl10 offset-xl1>
            <v-layout row align-center>
                <v-layout row grow align-center v-if="!isMobile">
                    <img
                        src="@/assets/nerva-miner.png"
                        alt="Logo"
                        class="nav-logo">
                </v-layout>
                <v-layout row grow align-center v-else>
                    <v-flex xs3>
                        <v-layout align-center justify-start>
                            <img
                                src="@/assets/logo.png"
                                alt="Logo"
                                class="nav-logo-mobile">
                        </v-layout>
                    </v-flex>
                    <v-flex xs6>
                        <v-layout row align-center justify-center>
                            <span class="subheading font-weight-medium secondary--text text--lighten-1">
                                Miner
                            </span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from '@/store';

export default {
    name: 'navTop',
    props: {
        isMobile: Boolean
    },
    computed: {
        
    },
    methods: {}
};
</script>

<style scoped>
.nav-logo {
    height: 42px;
    width: auto;
}
.nav-logo-mobile {
    height: 36px;
    width: auto;
}
.nav-link{
    color: #AEAEAE;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
}
.nav-link:hover, .nav-link:hover i {
    color: #EDEFF0;
}
.router-link-active.nav-link,
.router-link-exact-active.nav-link {
    cursor: default;
    color: #EDEFF0;
}
.menu-link {
    color: #AEAEAE;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
}
.menu-link:hover {
    color: #EDEFF0;
}
.router-link-active .menu-link,
.router-link-exact-active .menu-link {
    cursor: default;
    color: #FAFBFC;
}
</style>
