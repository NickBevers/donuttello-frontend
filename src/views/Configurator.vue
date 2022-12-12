<script setup>
    import Navigation from '../components/Navigation.vue';
    import ConfiguratorSidebar from '../components/ConfiguratorSidebar.vue';
    import DonutCanvas from '../components/DonutCanvas.vue';

    const logAll = (donut) => {
        console.log(donut.color);
        console.log(donut.topping);
        console.log(donut.text);
    }

</script>

<template>
    <div class="home">
        <Navigation />
        <div class="configurator__container">
            <ConfiguratorSidebar @createDonut="logAll" />
            <div class="configurator__canvas">
                <DonutCanvas />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .configurator__container {
        display: flex;
        flex-direction: row;
        justify-content: baseline;
        align-items: flex-start;
        width: 100vw;
        height: calc(100vh - 5.7em);
        overflow: hidden;
    }

    .configurator__canvas{
        width: 72vw;
        height: calc(100vh - 5.7em);
    }
</style>