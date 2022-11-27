<script setup>
    import Navigation from '../components/Navigation.vue';
    import LoginForm from '../components/LoginForm.vue';
    // import { login } from '../assets/functions/login';

</script>

<template>
    <div class="login__container">
        <Navigation />
        <div class="form__container--login">
            <h3>Meld je hier aan</h3>
            <LoginForm />
        </div>

    </div>
</template>
