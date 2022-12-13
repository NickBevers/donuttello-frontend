<script setup>
    import { ref, watch } from 'vue'
    import { useDonutStore } from "../../stores/donutConf.js";

    const donutStore = useDonutStore();
    const checked = ref(false);
    const donutName = ref("");
    const companyName = ref("");
    const email = ref("");
    const phone = ref("");

    watch(donutName, (value) => {
        // console.log(value);
        donutStore.setDonutName(donutName.value);
    });
    
    watch(companyName, (value) => {
        // console.log(value);
        donutStore.setCompanyName(companyName.value);
    });
    
    watch(email, (value) => {
        // console.log(value);
        donutStore.setEmail(email.value);
    });
    
    watch(phone, (value) => {
        // console.log(value);
        donutStore.setPhone(phone.value);
    });
    
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Klantengegevens</h3>
      <input class="confSidebar__item__checkbox" type="checkbox" id="checkbox" v-model="checked" @click="checked = !checked" />
    </header>

    <section v-if="checked" class="confSidebar__item__section">
        <div class="userdata__container">
            <label for="donutName">Naam van de donut</label>
            <input type="text" id="donutName" name="donutName" v-model="donutName">

            <label for="companyName">Bedrijfsnaam</label>
            <input type="text" id="companyName" name="companyName" v-model="companyName">

            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" v-model="email">

            <label for="phone">Telefoonnummer</label>
            <input type="text" id="phone" name="phone" v-model="phone">
        </div>
    </section>
  </div>
</template>

<style scoped>
    .confSidebar__item__checkbox{
        -webkit-appearance: none;
        appearance: none;
        background: url("../../assets/images/arrow--down.svg");
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
        background-size: contain;
        width: 1.25em;
        height: 1.25em;
        margin: 0.5em 0 0 0.5em;
        cursor: pointer;
        transition: transform 0.25s ease-in-out;
    }
    .confSidebar__item__checkbox:checked{
        transform: rotate(-180deg);
    }
</style>