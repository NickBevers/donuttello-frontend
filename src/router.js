import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Configurator from './views/Configurator.vue'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'

export default createRouter({
    history: createWebHistory(),
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
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ]
})