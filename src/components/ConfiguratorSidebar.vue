<script setup>
    import { ref } from 'vue'
    import SidebarItem from './ConfgiruatorSidebarItems.vue';
    import { ColorPicker } from 'vue-accessible-color-picker';

    const color = ref('#000000');

    function updateColor (e) {
        color.value = e.cssColor;
    }
</script>

<template>
    <p>hey this works</p>
    <SidebarItem />
    <div class="colorpicker__container">
        <ColorPicker :color="color" :visible-formats="['hex']" @color-change="updateColor"/>
        {{ color }}
    </div>
</template>

<style scoped>

</style>