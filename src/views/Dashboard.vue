<script setup>
    import { onMounted, ref } from 'vue'
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
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken.value}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                donuts.value = data.data;
            } else {
                console.log(data);
            }
        });
    }

    onMounted(() => {
        getDonuts();
    })
</script>

<template>
    <div class="home">
        <Navigation />
        <div class="dashboard__container">
            <div class="filter__container">
                <div class="filter">
                    <label for="filter">Filter</label>
                    <select name="filter" id="filter" v-model="filter" v-on:change="getDonuts">
                        <option value="all">All</option>
                        <option value="order" selected>Ordered</option>
                        <option value="notOrder">Not Ordered</option>
                    </select>
                    {{ filter }}
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
                        <DonutCard :donut="donut" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .donut__card__container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5em;
    }
</style>