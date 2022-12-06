import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Configurator from './views/Configurator.vue'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import Detail from './views/Detail.vue'

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
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword,
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail,
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ]
})