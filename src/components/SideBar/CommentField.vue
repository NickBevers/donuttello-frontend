<script setup>
import { ref } from 'vue';
import { useDonutStore } from "../../stores/donutConf.js";
const donutStore = useDonutStore();
const textFieldInput = ref('');
const handleInput = () => {
  donutStore.setExtraWishes(textFieldInput.value);
};
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Extra wensen of opmerkingen (optioneel)</h3>
    </header>
    <form action="">
    <textarea name="commentField" v-model="textFieldInput" @input="handleInput()" id="commentField" class="confSidebar__item--commentField" cols="30" rows="10">
      Here is a text field
    </textarea>
    </form>
  </div>
</template>

<style scoped>
.confSidebar__item--commentField{
    font-family: "Dosis", sans-serif;
}

</style>