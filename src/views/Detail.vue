<script setup>

    import { reactive, computed } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import DetailCanvas from '../components/DetailCanvas.vue';
    import DetailSidebar from '../components/DetailSidebar.vue';
    const donutId = window.location.href.split('/').pop();

    let donut = reactive({ data: {} });

    
    fetch(`https://donuttello-backend.onrender.com/api/v1/donuts/${donutId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success") {
            // console.log(data);
            donut.data = data.data;
            console.log(donut.data);
        } else {
            console.log("something went wrong, please try again");
            console.log(data);
        }
    });


</script>

<template>
    <div class="donut__detail">
        <Navigation />

        <div class="configurator__container">
            <DetailSidebar :donut="donut.data" />
            <div class="configurator__canvas donut__detail__canvas">
                <DetailCanvas :donut="donut.data" />
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
        width: 82vw;
        height: calc(100vh - 5.7em);
    }

</style>