<script setup>
    import { ref } from 'vue';
  
    const email = ref('');
    const passwordOld = ref('');
    const passwordNew = ref('');
    const showPassword = ref(false);
    const loginErrorStatus = ref(null);
    const loginErrorMessage = ref('');

    const togglePassword = () => {
        showPassword.value = !showPassword.value;
    }

    function loginSubmit() {
        const token = localStorage.getItem("jwtToken");
        fetch("https://donuttello-backend.onrender.com/api/v1/users/resetpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ "email": email.value , "passwordOld": passwordOld.value, "passwordNew": passwordNew.value }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                // console.log(data);
                email.value = "";
                passwordOld.value = "";
                passwordNew.value = "";
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
                <label for="passwordOld">Paswoord</label>
                <div class="form__item--password form__item--passwordOld">
                    <input v-if="showPassword" type="text" id="passwordOld" name="passwordOld" placeholder="Old Password" v-model="passwordOld"/>
                    <input v-else type="password" id="passwordOld" name="passwordOld" placeholder="Old Password" v-model="passwordOld"/>
                    
                    <font-awesome-icon @click="togglePassword" v-if="showPassword" class="icon--eye" icon="fa-solid fa-eye-slash" />
                    <font-awesome-icon @click="togglePassword" v-else class="icon--eye" icon="fa-solid fa-eye" />
                </div>
            </div>

            <div class="form__item">
                <label for="passwordNew">Paswoord</label>
                <div class="form__item--password form__item--passwordNew">
                    <input v-if="showPassword" type="text" id="passwordNew" name="passwordNew" placeholder="New Password" v-model="passwordNew"/>
                    <input v-else type="password" id="passwordNew" name="passwordNew" placeholder="New Password" v-model="passwordNew"/>
                    
                    <font-awesome-icon @click="togglePassword" v-if="showPassword" class="icon--eye" icon="fa-solid fa-eye-slash" />
                    <font-awesome-icon @click="togglePassword" v-else class="icon--eye" icon="fa-solid fa-eye" />
                </div>
            </div>

            <div class="form__item form__item--forgot">
                <a href="/home">go back</a>
            </div>

            <div class="form__item form__item--reset">
                <button type="submit">Wijzig paswoord</button>
            </div>
        </form>
    </div>
</template>