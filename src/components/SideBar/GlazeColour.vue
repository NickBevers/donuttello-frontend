<script setup>
    import { ref } from 'vue'
    import { ColorPicker } from 'vue-accessible-color-picker';
    import { useDonutStore } from "../../stores/donutConf.js";

    const donutStore = useDonutStore();
    const checked = ref(false);
    const color = ref('#ffebfc');

    function updateColor (e) {
        color.value = e.cssColor;
        donutStore.setGlazeColor(color.value);
    }
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Kleur van de glazuur</h3>
      <input class="confSidebar__item__checkbox" type="checkbox" id="checkbox" v-model="checked" @click="checked = !checked" />
    </header>

    <section v-if="checked" class="confSidebar__item__section">
        <div class="colorpicker__container">
          <ColorPicker :color="color" :visible-formats="['hex']" alpha-channel="hide" default-format="hex" @color-change="updateColor"/>
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