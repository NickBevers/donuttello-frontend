<script setup>
    import Navigation from '../components/Navigation.vue';
    import ConfiguratorSidebar from '../components/ConfiguratorSidebar.vue';
    import DonutCanvas from '../components/DonutCanvas.vue';

    const logAll = (donut) => {
        console.log(donut);
        console.log(donut.filling); // filling  
        console.log(donut.glaze); // glazeColor
        console.log(donut.topping2); // toppings
        console.log(donut.topping1); // sprinkles
        console.log(donut.logoShape); // logoShape
        console.log(donut.comment); // comment
        console.log(donut.logo);
        console.log(donut.name);
        console.log(donut.company);
        console.log(donut.email);
        console.log(donut.phone);

        /* 
            filling: tempFilling.value,
            glazeColor: tempColor.value,
            toppings: tempTopping.value,
            sprinkles: tempSprinkles.value,
            logoShape: tempShape.value,
            comment: tempComment.value
        */
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