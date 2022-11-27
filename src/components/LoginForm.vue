<script setup>
    import { ref } from 'vue';
    
    const showPassword = ref(true);
    const togglePassword = () => {
        showPassword.value = !showPassword.value;
    }
</script>

<template>
    <div class="form__container">
        <form @submit.prevent="handleSubmit">
            <div class="form__item">
                <label for="email">E-mailadres</label>
                <input type="email" id="email" name="email" placeholder="Email" v-model="email"/>
            </div>
            <div class="form__item">
                <label for="password">Paswoord</label>
                <div class="form__item--password">
                    <input v-if="showPassword" type="text" id="password" name="password" placeholder="Password" v-model="password"/>
                    <input v-else type="password" id="password" name="password" placeholder="Password" v-model="password"/>
                    
                    <font-awesome-icon @click="togglePassword" v-if="showPassword" class="icon--eye" icon="fa-solid fa-eye-slash" />
                    <font-awesome-icon @click="togglePassword" v-else class="icon--eye" icon="fa-solid fa-eye" />
                </div>
            </div>

            <div class="form__item form__item--forgot">
                <a href="/forgot-password">Paswoord vergeten?</a>
            </div>

            <div class="form__item form__item--submit">
                <button type="submit">Inloggen</button>
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