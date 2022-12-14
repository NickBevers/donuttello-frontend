<script setup>
    import { onMounted, ref, reactive, watch } from 'vue';
    import router from '../router';
    let detailData = reactive( {} );
    let sprinkles = ref('');
    let isAdmin = ref(false);
    const jwtToken = localStorage.getItem('jwtToken');

    const detailProps = defineProps({
        donut: {
            type: Object,
            required: true
        }
    });
    
    if(jwtToken) {
        fetch(`https://donuttello-backend.onrender.com/api/v1/users/auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                isAdmin.value = true;
            }
        });
    }

    watch(detailProps, () => {
        detailData = detailProps.donut;
        sprinkles.value = detailProps.donut.topping1;
    });

</script>

<template>
    <div class="detailSidebar">
        <div class="button__container--back" @click="router.push('/dashboard')">
            <a class="button--back"><font-awesome-icon class="icon--left" icon="fa-solid fa-chevron-left" />Terug</a>
        </div>
        <h2 class="detailSidebar__title">Orderdetail</h2>
        <ul class="detailSidebar__items">
            <li class="detailSidebar__item item--name">
                <span class="item__label">Donut name:</span>
                <span class="item__value">{{detailData.name}}</span>
            </li>

            <li class="detailSidebar__item item--amount">
                <span class="item__label">Amount:</span>
                <span class="item__value">{{detailData.amount}}</span>
            </li>

            <li class="detailSidebar__item item--filling">
                <span class="item__label">Filling:</span>
                <span class="item__value">{{detailData.filling}}</span>
            </li>
            
            <li class="detailSidebar__item item--sprinkles">
                <span class="item__label">Sprinkles: </span>
                <span class="item__value">{{sprinkles.split(" ")[1] || "Geen sprinkles"}}</span>
            </li>
            
            <li class="detailSidebar__item item--topping">
                <span class="item__label">Topping: </span>
                <span class="item__value">{{detailData.topping2}}</span>
            </li>
            
            <li class="detailSidebar__item item--glaze">
                <span class="item__label">Glaze: </span>
                <span class="item__value">{{detailData.glaze}}</span>
            </li>
            
            <li class="detailSidebar__item item--email" v-if="isAdmin">
                <span class="item__label">Email: </span>
                <span class="item__value">{{detailData.email}}</span>
            </li>
            
            <li class="detailSidebar__item item--phone" v-if="isAdmin">
                <span class="item__label">Phone: </span>
                <span class="item__value">{{detailData.phone}}</span>
            </li>
            
            <li class="detailSidebar__item item--company">
                <span class="item__label">Company name: </span>
                <span class="item__value">{{detailData.company}}</span>
            </li>
            
            <li class="detailSidebar__item item--comment">
                <span class="item__label">Comment: </span>
                <span class="item__value item__value--comment">{{detailData.comment}}</span>
            </li>
            
            <li class="detailSidebar__item item--logoShape">
                <span class="item__label">Logo shape: </span>
                <span class="item__value">{{detailData.logoShape}}</span>
            </li>
            
            <li class="detailSidebar__item item--orderStatus">
                <span class="item__label">Order status: </span>
                <span class="item__value">{{detailData.orderStatus}}</span>
            </li>
            
            <li class="detailSidebar__item item--orderDate">
                <span class="item__label">Order date: </span>
                <span class="item__value">{{new Date(detailData.dateCreated).toLocaleDateString('en-GB')}}</span>
            </li>
        </ul>
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
        position: relative;
    }

    .button__container--back{
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        width: 4em;
        padding: 0.5em 0.8em;
        border-radius: var(--border-radius);
        background-color: var(--pink--main);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: var(--font-size--xsmall);
        font-weight: var(--font-weight--semi-bold);
        text-transform: uppercase;
        cursor: pointer;
    }

    .button__container--back:hover > .button--back{
        color: var(--yellow--main);
    }

    .icon--left{
        margin-right: 0.2em;
    }

    .detailSidebar__title{
        margin: 0 0 1em 0;
        padding: 0.5em;
        font-size: 1.5em;
        font-weight: 700;
    }

    .detailSidebar__items {
        /* height: calc(100% - 72px); */
        padding-left: 0.8em;
        font-size: 1.2em;
    }

    .detailSidebar__item {
        min-height: 3em;
        display: flex;
        flex-direction: column;
        margin: 0 0 1.2em 0;
    }

    .item__label {
        font-weight: 600;
        padding-bottom: 0.4em;
        box-sizing: content-box;
    }

    .item__value {
        font-weight: 400;
        box-sizing: content-box;
    }

    .item__value--comment{
        padding-right: 0.6em;
        line-height: 1.15;
    }
</style>