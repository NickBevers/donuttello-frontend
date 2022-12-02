<script setup>

import{ref} from "vue";

const checked = ref(false);
const test = () => {
  console.log(checked.value);
}
// read input file name


</script>

<template>
  <div class="confSidebar__item">
  <form action="">
    <textarea name="" id="" cols="30" rows="10">
      Here is a text field
    </textarea>
  </form>
  </div>
</template>


<style scoped>

</style>