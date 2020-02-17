import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: (window.cordova) ? 'hash' : 'history',
    base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('@/views/Dashboard'),
            meta: {
                showNav: true,
                title: 'dashboard'
            }
        }
    ]
});

export default router;
