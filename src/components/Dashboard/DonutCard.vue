<script setup>
    import { onMounted } from 'vue';
    const props = defineProps({
        donut: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="donut__card__wrapper">
        <div class="donut__card__image">
            <div class="donut__card__date"> <span class="date--pink">{{ new Date(donut.dateCreated).toLocaleDateString('en-GB') }}</span></div>
        </div>
        <div class="donut__card__detail">
            <p class="donut__card__company">{{ donut.company }}</p>
            <p class="donut__card__name">{{ donut.name }}</p>
        </div>
    </div>
        
</template>

<style scoped>

    .donut__card__wrapper{
        width: clamp(200px, 16em, 300px);
        border-radius: var(--border-radius);
        box-shadow: 0 0 10px #00000035;
    }

    .donut__card__image{
        background-color: var(--pink--main);
        height: 11em;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
    }

    .donut__card__detail{
        height: 5em;
        border-radius:0 0 var(--border-radius) var(--border-radius);
        background-color: var(--white);
        padding: var(--padding-small);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .donut__card__date{
        max-width: 40%;
        text-align: center;
        margin: auto;
        padding: var(--padding-extra-small) 1em;
        background-color: var(--white);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        font-weight: var(--font-weight--semi-bold);
        color: var(--pink--main);
    }

    .donut__card__name, .donut__card__company{
        display: inline-block;
        font-size: var(--font-size--small);
        font-weight: var(--font-weight--semi-bold);
        color: var(--pink--main);
        font-size: var(--font-size--medium);
        word-wrap: break-word;
    }

    .donut__card__name{
        color: var(--grey);
        font-size: var(--font-size--small);
    }
</style>
