<script setup>
    import { ref } from 'vue'
    import DoughType from './SideBar/DoughType.vue';
    import FillingList from './SideBar/FillingList.vue';
    import GlazeColour from './SideBar/GlazeColour.vue';
    import GlazeFlavour from './SideBar/GlazeFlavour.vue';
    import Toppings from './SideBar/Toppings.vue';
    import UploadLogo from './SideBar/UploadLogo.vue';
    import LogoShape from './SideBar/LogoShape.vue';
    import CommentField from './SideBar/CommentField.vue';
</script>

<template>
    <div class="confSidebar">
        <DoughType />
        <FillingList />
        <GlazeColour />
        <GlazeFlavour />
        <Toppings />
        <UploadLogo />
        <LogoShape />
        <CommentField />
    </div>
</template>

<style scoped>
    .confSidebar{
        width: 30%;
        height: calc(100vh - 5.7em);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--pink--main) var(--white);
    }
</style>