<script setup>
    import Navigation from '../components/Navigation.vue';
    import { login } from '../assets/functions/login';

    const loginFunction = () => {
        login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5iZSIsImlhdCI6MTY2OTQ5MTY1MX0.wYbQ6QQxJq4a8uesyije7PS8PfywSTZO2PwDPAQhP0M", "test@test.be", "test1234");
    }

</script>

<template>
    <div class="">
        <Navigation />

        <button @click="loginFunction">Click me to login!</button>
    </div>
</template>
