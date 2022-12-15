<script setup>
    import { ref } from 'vue'
    const isAdmin = ref(false);
    const jwtToken = ref(localStorage.getItem('jwtToken'));
    
    if(jwtToken.value){
        fetch(`https://donuttello-backend.onrender.com/api/v1/users/auth`, {
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

    
    function logout() {
        localStorage.removeItem('jwtToken');
        isAdmin.value = false;
        router.push('/');
    }
</script>

<template>
    <nav>
        <div class="navigation__container">
            <div class="navigation__logo">
                <router-link exact to="/"><img src="../assets/images/donuttello-logo.svg" alt="logo"></router-link>
            </div>
            <div class="navigation__item__container">
                <router-link class="navigation__item" exact to="/"><a>Home</a></router-link>
                <router-link v-if="isAdmin" class="navigation__item" exact to="/dashboard"><a>Dashboard</a></router-link>
                <router-link class="navigation__item" exact to="/configurator"><a>Configurator</a></router-link>
                <router-link v-if="isAdmin" class="navigation__item" exact to="/forgot-password"><a>Wijzig Paswoord</a></router-link>
                <router-link v-if="!isAdmin" class="navigation__item navigation__item--icon" to="/login"><font-awesome-icon icon="fa-solid fa-user" /></router-link>
                <router-link v-else class="navigation__item navigation__item--icon" to="/dashboard"><font-awesome-icon icon="fa-solid fa-user" /></router-link>
            </div>
        </div>

        <div class="navigation__logout" v-if="isAdmin">
            <a class="logout" @click="logout">Logout</a>
        </div>
    </nav>
</template>

<style scoped>
    .navigation__logout {
        position: absolute;
        font-size: var(--font-size--small);
        font-family: var(--font--family--primary);
        font-weight: var(--font-weight--bold);
        text-transform: uppercase;
        right: 3em;
        top: calc((4.7em - var(--font-size--small)) / 2);
        cursor: pointer;
    }

    .logout {
        color: var( --yellow--main);
    }
</style>
