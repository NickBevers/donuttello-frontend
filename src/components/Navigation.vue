<script setup>
    import { ref } from 'vue'
    const isAdmin = ref(false);
    const jwtToken = ref(localStorage.getItem('jwtToken'));
    
    if(jwtToken.value){
        fetch(`http://localhost:3000/api/v1/users/auth`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken.value}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                isAdmin.value = true;
                // console.log(data);
            }
        });
    }
</script>

<template>
    <nav>
        <div class="navigation__container">
            <div class="navigation__logo">
                <img src="../assets/images/donuttello-logo.svg" alt="logo">
            </div>
            <div class="navigation__item__container">
                <router-link class="navigation__item" exact to="/"><a>Home</a></router-link>
                <router-link v-if="isAdmin" class="navigation__item" exact to="/dashboard"><a>Dashboard</a></router-link>
                <router-link class="navigation__item" exact to="/configurator"><a>Configurator</a></router-link>
                <router-link v-if="isAdmin" class="navigation__item" exact to="/forgot-password"><a>Wijzig Paswoord</a></router-link>
                <router-link class="navigation__item navigation__item--icon" to="/login"><font-awesome-icon icon="fa-solid fa-user" /></router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
