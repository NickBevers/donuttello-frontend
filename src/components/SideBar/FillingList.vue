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
      <h3 class="confSidebar__item__header__heading">This is the header of the SidebarListItems</h3>
      <input type="checkbox" id="checkbox" v-model="checked" @click="test"/>

    </header>
    <section class="confSidebar__item__section">
      <ul class="confSidebar__item__section--listing">
        <li class="listing__item">Option 1</li>
        <li class="listing__item">Option 2</li>
        <li class="listing__item">Option 3</li>
        <li class="listing__item">Option 4</li>
        <li class="listing__item">Option 5</li>
        <li class="listing__item">Option x</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

</style>