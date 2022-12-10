<script setup>

    import { reactive, computed } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import DonutCanvas from '../components/DonutCanvas.vue';
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

        <div class="donut__detail__container configurator__canvas">
            <DonutCanvas :donutData=donut.data />
        </div>
    </div>
</template>

<style scoped>
.configurator__canvas {
    width: 100%;
    height: calc(100vh - 5.7em);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cae3e8;
}

</style>