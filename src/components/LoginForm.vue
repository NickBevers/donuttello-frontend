<script setup>
    import { ref } from 'vue';
    import { login } from '../assets/functions/login';
    import router from '../router';
  
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const loginErrorStatus = ref(null);
    const loginErrorMessage = ref('');

    const togglePassword = () => {
        showPassword.value = !showPassword.value;
    }

    function loginSubmit() {
        fetch("https://donuttello-backend.onrender.com/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": username.value , "password": password.value }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                localStorage.setItem("jwtToken", data.token);
                username.value = "";
                password.value = "";
                showPassword.value = false;
                // vue router link to dashboard
                router.push("/dashboard");

                // location.href = "/dashboard";
            } else {
                loginErrorStatus.value = data.status;
                loginErrorMessage.value = data.message;
                setTimeout(() => {
                    loginErrorStatus.value = null;
                    loginErrorMessage.value = '';
                }, 7000);
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
                <label for="email">Gebruikersnaam</label>
                <input type="text" id="username" name="username" placeholder="Gebruikersnaam" v-model="username"/>
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

            <!-- <div class="form__item form__item--forgot">
                <a href="/forgot-password">Paswoord vergeten?</a>
            </div> -->

            <div class="form__item form__item--submit">
                <button type="submit">Inloggen</button>
            </div>
        </form>
    </div>
</template>