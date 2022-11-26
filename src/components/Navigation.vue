<script setup>
    import { ref, computed } from 'vue'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faUser } from '@fortawesome/free-solid-svg-icons';
    library.add(faUser);

</script>

<template>
    <nav>
        <div class="navigation__container">
            <div class="navigation__logo">
                <img src="../assets/donuttello-logo.svg" alt="logo">
            </div>
            <div class="navigation__item__container">
                <router-link class="navigation__item" exact to="/"><a>Home</a></router-link>
                <router-link class="navigation__item" exact to="/dashboard"><a>Dashboard</a></router-link>
                <router-link class="navigation__item" exact to="/configurator"><a>Configurator</a></router-link>
                <router-link class="navigation__item navigation__item--icon" to="/login"><font-awesome-icon icon="fa-solid fa-user" /></router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
