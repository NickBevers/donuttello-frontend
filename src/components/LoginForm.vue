<script setup>
    import { ref } from 'vue'
    import { login } from '../assets/functions/login';

</script>

<template>
    <div class="form__container">
        <form @submit.prevent="handleSubmit">
            <div class="form__item">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" v-model="email"/>
            </div>
            <div class="form__item">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" v-model="password"/>
            </div>
            <div class="form__item">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'LoginForm',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            handleSubmit() {
                console.log("submitted form");
            }
        }
    }
</script>