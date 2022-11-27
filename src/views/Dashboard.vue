<script setup>
    import { onMounted, ref } from 'vue'
    import Navigation from '../components/Navigation.vue';

    const jwtToken = ref(localStorage.getItem('jwtToken'));
    const donuts = ref([]);

    if(!jwtToken.value) { window.location.href = '/login'; }

    const getDonuts = () => {
        fetch("https://donuttello-backend.onrender.com/api/v1/donuts", {
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
        <p class="homeText">Dashboard</p>
        <pre v-if="donuts.length > 0">
            {{ donuts }}
        </pre>
    </div>
</template>
