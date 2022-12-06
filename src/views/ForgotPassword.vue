<script setup>
    import { ref, computed } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import ResetForm from '../components/ResetForm.vue';

    const email = ref('');
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
    <div class="resetpw__container">
        <Navigation />

        <div class="form__container--reset">
            <h3>Paswoord vergeten?</h3>
            <ResetForm />
        </div>
    </div>
</template>

<style scoped>

</style>