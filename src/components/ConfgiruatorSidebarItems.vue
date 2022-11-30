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
  <section>
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
      <li>Option 4</li>
      <li>Option 5</li>
      <li>Option x</li>
    </ul>
  </section>
  <section>
    This is the color picker section
  </section>
  <section>
    This is the upload logo section
  </section>
  <form action="">
    <textarea name="" id="" cols="30" rows="10">
      Here is a textfield
    </textarea>
  </form>
  </div>
</template>


<style scoped>

</style>