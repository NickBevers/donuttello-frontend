<script setup>
    import { defineProps } from 'vue'
    import * as three from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
    
    const props = defineProps({
        donutData: {
            type: Object,
            required: true
        }
    })
    const donut = props.donutData;

    

</script>

<template>

</template>

<style scoped>

</style>