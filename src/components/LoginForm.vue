<script setup>
    import { ref } from 'vue';
    import { login } from '../assets/functions/login';
  
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const loginErrorStatus = ref(null);
    const loginErrorMessage = ref('');

    const togglePassword = () => {
        showPassword.value = !showPassword.value;
    }

    async function loginSubmit() {
        fetch("https://donuttello-backend.onrender.com/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "email": email.value , "password": password.value }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                console.log(data);
                localStorage.setItem("jwtToken", data.token);
                email.value = "";
                password.value = "";
                showPassword.value = false;
                location.href = "/dashboard";
            } else {
                loginErrorStatus.value = data.status;
                loginErrorMessage.value = data.message;
                setTimeout(() => {
                    loginErrorStatus.value = null;
                    loginErrorMessage.value = '';
                }, 5000);
            }
        });

    }
</script>

<template>
    <div class="form__container">
        <div class="form__error" v-if="loginErrorStatus">
            <p class="form__error__text"> {{ loginErrorMessage }} </p>
        </div>
        <form @submit.prevent="loginSubmit">
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