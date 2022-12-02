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
      <label for="fileUpload" class="input__file__label">
        Upload your logo here <br>
        We accept png's, jpg's, jpeg's and webp's
      </label>
      <input class="input__file" type="file" id="fileUpload" name="fileUpload">
    </section>
  </div>
</template>

<style scoped>

</style>