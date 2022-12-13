<script setup>
    import { ref } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import ConfiguratorSidebar from '../components/ConfiguratorSidebar.vue';
    import DonutCanvas from '../components/DonutCanvas.vue';
    const status = ref("");
    const donutLink = ref("");

    const logAll = (donut) => {
        // console.log(donut);
        // console.log(donut.filling); // filling  
        // console.log(donut.glaze); // glazeColor
        // console.log(donut.topping2); // toppings
        // console.log(donut.topping1); // sprinkles
        // console.log(donut.logoShape); // logoShape
        // console.log(donut.comment); // comment
        // console.log(donut.logo);
        // console.log(donut.name);
        // console.log(donut.company);
        // console.log(donut.email);
        // console.log(donut.phone);

        fetch("https://donuttello-backend.onrender.com/api/v1/donuts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donut)
            }
        )
        .then((response) => response.json())
        .then((data) => {
            donutLink.value = `${window.location.origin}/detail/${data.url}`;
            status.value = "Your donut has been ordered. <br> Click here to copy the shareable link.";
        });
    }



    function copyLink(){
        navigator.clipboard.writeText(donutLink.value);
        status.value = "Link copied to clipboard.";
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

        <div class="configurator__status" @click="copyLink" v-if="status.length > 2">
            <p class="configurator__status__message" :innerHTML="status"></p>
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

    .configurator__status{
        background-color: var(--green);
        width: 70ch;
        height: 5em;
        position: absolute;
        top: 8em;
        left: calc(50% - 35ch);
        border-radius: var(--border-radius);
        display: grid;
        place-items: center;
    }

    .configurator__status__message{
        color: var(--white);
        font-size: var(--font-size--medium);
        text-align: center;
    }
</style>