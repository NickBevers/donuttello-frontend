<script setup>
import { ref } from 'vue'
const checked = ref(false);
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Vulling</h3>
      <input type="checkbox" id="checkbox" v-model="checked" @click="toggle = !toggle"/>

    </header>
    <section v-if="toggle" class="confSidebar__item__section">
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