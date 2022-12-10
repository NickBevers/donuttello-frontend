<script setup>
import { ref } from 'vue'
import { ColorPicker } from 'vue-accessible-color-picker';

const color = ref('#000000');

function updateColor (e) {
  color.value = e.cssColor;
  console.log(color.value);
}
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Kleur van de glazuur</h3>
    </header>
    <div class="colorpicker__container">
      <ColorPicker :color="color" :visible-formats="['hex']" alpha-channel="hide" default-format="hex" @color-change="updateColor"/>
    </div>
  </div>
</template>

<style scoped>
    

</style>