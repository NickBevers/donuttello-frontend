<script setup>

</script>

<template>
    <div class="detailSidebar">
    </div>
</template>

<style scoped>

    .configurator__container {
        display: flex;
        flex-direction: row;
        justify-content: baseline;
        align-items: flex-start;
        width: 100vw;
        height: calc(100vh - 5.7em);
        overflow: hidden;
    }

    .detailSidebar{
        width: 20vw;
        height: calc(100vh - 5.7em);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--pink--main) var(--white);
    }
</style>