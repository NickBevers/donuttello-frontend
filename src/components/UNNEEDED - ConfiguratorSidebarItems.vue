<script setup>
import DoughType from './SideBar/DoughType.vue';
import FillingList from './SideBar/FillingList.vue';
import GlaceColour from './SideBar/GlazeColour.vue';
import GlaceFlavour from './SideBar/GlazeFlavour.vue';
import Toppings from './SideBar/Toppings.vue';
import UploadLogo from './SideBar/UploadLogo.vue';
import LogoShape from './SideBar/LogoShape.vue';
import TextField from './SideBar/TextField.vue';
</script>

<template>
  <div class="confSidebar">
    <DoughType />
    <FillingList />
    <GlaceColour />
    <GlaceFlavour />
    <Toppings />
    <UploadLogo />
    <LogoShape />
    <TextField />
  </div>
</template>


<style scoped>

</style>