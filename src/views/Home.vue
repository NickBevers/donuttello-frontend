<script setup>
    import { ref, computed } from 'vue'
    import Navigation from '../components/Navigation.vue';
</script>

<template>
    <div class="main__container">
        <Navigation />
        <section class="text__container">
            <h1 class="text__title">Verse Vlaamse Donuts in de Stijl van Jouw Bedrijf als Onvergetelijke Attentie of Heerlijk Dessert</h1>
            <p class="text__detail">Creëer je eigen donut om een idee te krijgen van wat je kan verwachten bij ons. <br>
                Of bestel hem meteen om hem te laten bezorgen.
            </p>

            <div class="button__container">
                <router-link exact to="/configurator"><a class="button__text">Creëer je eigen donut</a></router-link>
            </div>
        </section>
    </div>
</template>
