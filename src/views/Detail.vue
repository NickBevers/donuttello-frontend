<script setup>

    import { reactive, ref, computed } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import DetailCanvas from '../components/DetailCanvas.vue';
    import DetailSidebar from '../components/DetailSidebar.vue';
    const donutId = window.location.href.split('/').pop();

    let donut = reactive({ data: {} });
    let isAdmin = ref(false);

    // fetch auth
    fetch(`https://donuttello-backend.onrender.com/api/v1/users/auth`, {
        method: "GET",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwtToken")
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success") {
                isAdmin.value = true;
        } else {
            console.log("something went wrong, please try again");
            // console.log(data);
        }
    });

    
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
            // console.log(donut.data);
        } else {
            console.log("something went wrong, please try again");
            // console.log(data);
        }
    });


    //ordered, inProduction, produced
    function changeStatus(status){
        fetch(`https://donuttello-backend.onrender.com/api/v1/donuts/status/${donutId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            },
            body: JSON.stringify({
                orderStatus: status
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                // console.log(data);
                donut.data = data.data;
                // console.log(donut.data);
            } else {
                console.log("something went wrong, please try again");
                // console.log(data);
            }
        });
    }


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

        <div class="statusBtn__container" v-if="isAdmin">
            <a class="statusBtn btn--production" @click="changeStatus( `inProduction`)" v-if="donut.data.orderStatus==='ordered'">Bestelling is in productie</a>
            <a class="statusBtn btn--production disabled" v-else>Bestelling is in productie</a>
            <a class="statusBtn btn--done" @click="changeStatus(`produced`)">Bestelling is klaar</a>
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

    .statusBtn__container{
        position: absolute;
        top: 6em;
        right: 2em;
        display: flex;
        flex-direction: column;
    }

    .statusBtn{
        padding: 0.5em 0.8em;
        margin: 0.3em 0;
        background-color: var(--pink--main);
        border-radius: var(--border-radius);
        font-weight: var(--font-weight--semi-bold);
        text-transform: uppercase;
        text-align: center;
        cursor: pointer;
    }

    .statusBtn:hover{
        color: var(--yellow--main);
    }    

    .statusBtn:first-of-type{
        margin-top: 1.5em;
    }

    .disabled{
        background-color: var(--pink--pastel);
        cursor: not-allowed;
    }

    .disabled:hover{
        color: var(--white);
    }

</style>