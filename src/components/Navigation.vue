<script setup>
    import { ref, computed } from 'vue'
</script>

<template>
    <div class="nav">
        <div class="navigation__container">
            <div class="navigation__logo">
                <img src="../assets/logo.png" alt="logo">
            </div>
            <div class="navigation__links">
                <router-link to="/">Home</router-link>
                <router-link to="/dashboard">Dashboard</router-link>
                <router-link to="/configurator">Configurator</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
