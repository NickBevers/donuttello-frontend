<script setup>
    import { ref, watch, onMounted } from 'vue';
    import downloadBtn from './DownloadBtn.vue'
    import router from '../../router';
    const isAdmin = ref(true);
    const orderStatus = ref('');
    const confirmTrue = ref(false);

    const props = defineProps({
        donut: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['removeDonut', 'confirmRemove']);

    fetch(`https://donuttello-backend.onrender.com/api/v1/users/auth`, {
        method: "GET",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status !== "success") {
            isAdmin.value = false;
            router.push('/login');
        } else {
            // console.log(data);
            isAdmin.value = true;
        }
    });

    switch (props.donut.orderStatus) {
        case 'ordered':
            orderStatus.value = 'Besteld';
            break;
        case 'inProduction':
            orderStatus.value = 'in productie';
            break;
        case 'produced':
            orderStatus.value = 'Geproduceerd';
            break;
    }

    function removeConfirm(){
        confirmTrue.value = true;
        emit('confirmRemove');
    }


</script>

<template>
    <div class="donut__card__wrapper">
        <div class="donut__card__date">
            <p class="date--day">{{ new Date(donut.dateCreated).getDate() }}</p>
            <p class="date--weekDay">{{ new Date(donut.dateCreated).toLocaleString('default', { month: 'short' }) }}</p>
        </div>

        <div class="donut__card__orderDetail">
            <p class="donut__card__company">{{ donut.company }}</p>
            <p class="donut__card__amount">Aantal: {{ donut.amount }}</p>
        </div>
        
        <p class="donut__card__status">{{ orderStatus }} </p>
        <downloadBtn class="donut__card__download" v-if="donut.logo.length > 1" :url="donut.logo" :fileName="donut.name" />
        
        <div class="donut__card__remove" v-if="isAdmin" @click.stop="removeConfirm"> <font-awesome-icon icon="fa-solid fa-trash" /> </div>
    </div>
</template>

<style scoped>

    .donut__card__wrapper{
        width: 100%;
        height: 6em;
        border-radius: var(--border-radius);
        box-shadow: 0 0 0px #00000035;
        position: relative;
        background-color: var(--blue--pastel);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: var(--black);
    }

    .donut__card__date{
        display: flex;
        flex-direction: column;
        width: 4em;
        height: 4em;
        min-width: 4em;
        align-items: center;
        justify-content: center;
        margin: auto 2em auto 2em;
        background-color: var(--pink--main);
        border-radius: var(--border-radius);
        color: var(--white);
        font-weight: var(--font-weight--bold);
    }

    .date--day{
        font-size: 1.8em;
    }

    .donut__card__orderDetail{
        display: flex;
        flex-direction: column;
        width: clamp(400px, 55%, 1200px);
        height: 4em;
        align-items: flex-start;
        justify-content: center;
        margin: auto 0 auto 0;
    }

    .donut__card__company{
        font-weight: var(--font-weight--bold);
        font-size: var(--font-size--medium);
        margin-bottom: 0.4em;
    }

    .donut__card__amount{
        font-weight: var(--font-weight--regular);
        font-size: var(--font-size--small);
    }

    .donut__card__status{
        font-weight: var(--font-weight--regular);
        font-size: var(--font-size--small);
        margin: auto 2em auto 0;
        width: 8em;
        text-align: end;
    }

    .donut__card__download{
        margin: auto 2em auto 0;
        text-transform: uppercase;
    }

    /* .donut__card__mail{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 30px;
        margin-bottom: 0.5em;
        margin-right: 0.5em;
    }

    .donut__card__mail__link:hover{
        cursor: pointer;
        color: var(--blue--main);
    }*/

    .donut__card__remove{
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        margin: auto 1.5em auto 0;
        color: var(--pink--main);
        font-size: var(--font-size--medium);
        z-index: 5;
    }

    .donut__card__remove:hover{
        cursor: pointer;
        color: var(--pink--pastel);
    }

    /*.donut__card__mail__link{
        color: var(--pink--main);
        font-size: var(--font-size--large);
        width: 100%;
        height: 100%;
    } */

    .filter__input{
        margin-right: 0.5em;
        padding: 0.2em 0;
        border: none;
        border-radius: 0.5em;
        background-color: var(--pink--main);
        color: var(--white);
        font-size: var(--font-size--small);
        font-weight: var(--font-weight-semibold);
        position: absolute;
        top: 10em;
        right: 0;
        width: 50px;
    }

    .filter__input:focus{
        outline: none;
    }

    .filter__input:hover{
        cursor: pointer;
    }

    .filter__input option{
        background-color: var(--pink--main);
        color: var(--white);
    }
</style>
