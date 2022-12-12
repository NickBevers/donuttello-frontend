<script setup>
    import { onMounted, onBeforeMount, ref } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import DonutCard from '../components/Dashboard/DonutCard.vue';

    const jwtToken = ref(localStorage.getItem('jwtToken'));
    const donuts = ref([]);
    const filter = ref('order');

    /*

    function sorting() {
  switch (filter.value) {
    case "votes-high-to-low":
      donuts.donuts.sort((a, b) => (b.votes > a.votes ? 1 : -1));
      break;
    case "votes-low-to-high":
      donuts.donuts.sort((a, b) => (b.votes < a.votes ? 1 : -1));
      break;
    case "date-new-to-old":
      donuts.donuts.sort((a, b) => new Date(b.date) > new Date(a.date) ? 1 : -1 );
      break;
    case "date-old-to-new":
      donuts.donuts.sort((a, b) => new Date(b.date) < new Date(a.date) ? 1 : -1 );
      break;
  }
}

    */

    if(!jwtToken.value) { window.location.href = '/login'; }
    const getDonuts = () => {
        fetch(`https://donuttello-backend.onrender.com/api/v1/donuts?filter=${filter.value}`, {
            method: "GET",
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken.value}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                donuts.value = data.data;
            } else {
                // console.log(data);
            }
        });
    }

    onMounted(() => {
        getDonuts();
        
        // remove all canvas elements
        let canvas = document.getElementsByTagName('canvas');
        while (canvas[0]) canvas[0].parentNode.removeChild(canvas[0]);
    })
</script>

<template>
    <div class="home">
        <Navigation />
        <div class="dashboard__container">
            <div class="filter__container">
                <div class="filter">
                    <label for="filter" class="filter__label">Wat te tonen: </label>
                    <select name="filter" class="filter__input" id="filter" v-model="filter" v-on:change="getDonuts">
                        <option value="all">Alles</option>
                        <option value="order" selected>Bestellingen</option>
                        <option value="notOrder">Creaties</option>
                    </select>
                </div>
            </div>

            <div class="donuts__container">
                <div class="donuts__container__title">
                    <h2 v-if="filter == 'all'">Alle Donuts</h2>
                    <h2 v-else-if="filter == 'order'">Bestellingen</h2>
                    <h2 v-else>Creaties</h2>
                </div>

                <div class="donut__card__container">
                    <div v-for="donut in donuts" :key="donut._id" class="donut__card">
                        <a :href="'/detail/' + donut._id" ><DonutCard :donut="donut" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .filter{
        position: absolute;
        top: 8.7em;
        right: 5em;
    }

    .filter__label{
        font-size: var(--font-size--medium);
        font-weight: var(--font-weight-semibold);
        color: var(--pink--main);
    }

    .filter__input{
        margin-left: 1em;
        padding: 0.2em 0.5em;
        border: none;
        border-radius: 0.5em;
        background-color: var(--pink--main);
        color: var(--white);
        font-size: var(--font-size--small);
        font-weight: var(--font-weight-semibold);
    }

    .filter__input:focus{
        outline: none;
    }

    .filter__input:hover{
        cursor: pointer;
    }

    .filter__input option{
        background-color: var(--pink--main);
        color: var(--white);
    }

    .donuts__container__title{
        margin: var(--margin-medium) 0;
        font-size: var(--font-size--xlarge);
        font-weight: var(--font-weight--bold);
        text-align: center;
    }
    .donut__card__container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5em;
        margin-top: var(--margin-xxxlarge);
    }
</style>