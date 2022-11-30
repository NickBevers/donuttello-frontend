<script setup>
    import { onMounted, ref } from 'vue'
    import Navigation from '../components/Navigation.vue';

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
            <div class="dashboard__container__header">
                <h1>Dashboard</h1>
                <div class="dashboard__container__header__filter">
                    <label for="filter">Filter</label>
                    <select name="filter" id="filter" v-model="filter" v-on:change="getDonuts">
                        <option value="all">All</option>
                        <option value="order" selected>Ordered</option>
                        <option value="notOrder">Not Ordered</option>
                    </select>
                    {{ filter }}
                </div>
            </div>
            <div class="dashboard__container__donuts">
                <div class="dashboard__container__donuts__donut" v-for="donut in donuts" :key="donut.id">
                    <div class="dashboard__container__donuts__donut__image">
                        <img :src="donut.image" alt="donut">
                    </div>
                    <div class="dashboard__container__donuts__donut__info">
                        <h2>{{ donut.name }}</h2>
                        <p>{{ donut.description }}</p>
                        <p>{{ donut.price }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>