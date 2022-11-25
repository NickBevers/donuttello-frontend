import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Configurator from './views/Configurator.vue'
import Dashboard from './views/Dashboard.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/configurator',
            name: 'Configurator',
            component: Configurator,
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
    ]
})