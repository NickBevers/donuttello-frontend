<script setup>
    import { ref, computed } from 'vue'
    // import Dashboard from './Dashboard.vue';
    // import Configurator from './Configurator.vue';
    import Navigation from '../components/Navigation.vue';
</script>

<template>
    <div class="home">
        <Navigation />
        <p class="homeText">Home</p>
    </div>
</template>

<style scoped>
    .home{
        width: 100%;
        height: 100vh;
        background-color: #E72C70;
        color: #E72C70;
    }
</style>
