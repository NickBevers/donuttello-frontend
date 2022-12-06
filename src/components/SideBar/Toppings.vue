<script setup>
import{ref} from "vue";

const checked = ref(false);
const test = () => {
  console.log(checked.value);
}
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Toppings</h3>
      <input type="checkbox" id="checkbox" v-model="checked" @click="test"/>

    </header>
    <section class="confSidebar__item__section">
      <ul class="confSidebar__item__section--listing">
        <li class="listing__item">Optie 1</li>
        <li class="listing__item">Optie 2</li>
        <li class="listing__item">Optie 3</li>
        <li class="listing__item">Optie 4</li>
        <li class="listing__item">Optie 5</li>
        <li class="listing__item">Optie x</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

</style>