<script setup>
    import { ref } from 'vue'
    import Navigation from '../components/Navigation.vue';

    const jwtToken = ref(localStorage.getItem('jwtToken'));
    if(!jwtToken.value) { window.location.href = '/login'; }
</script>

<template>
    <div class="home">
        <Navigation />
        <p class="homeText">Dashboard</p>
    </div>
</template>

<style scoped>

</style>
