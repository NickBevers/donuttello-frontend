<script setup>
    import { ref, watch } from 'vue';
    import router from '../../router';
    const isAdmin = ref(false);

    const props = defineProps({
        donut: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['removeDonut']);

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
            router.push('/login');
        } else {
            // console.log(data);
            isAdmin.value = true;
        }
    });


    const removeDonut = () => {
        fetch(`https://donuttello-backend.onrender.com/api/v1/donuts/${props.donut._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                console.log(data);
                emit('removeDonut');
            } else {
                console.log("something went wrong, please try again");
                // console.log(data);
            }
        });
    }

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

        <div class="donut__card__mail">
            <a :href="'mailto:' + donut.email" @click.stop="" class="donut__card__mail__link"><font-awesome-icon icon="fa-solid fa-envelope" /></a>
        </div>

        <div class="donut__card__remove" v-if="isAdmin" @click.stop="removeDonut">
            <font-awesome-icon icon="fa-solid fa-trash" />
        </div>
    </div>
        
</template>

<style scoped>

    .donut__card__wrapper{
        width: clamp(200px, 16em, 300px);
        border-radius: var(--border-radius);
        box-shadow: 0 0 10px #00000035;
        position: relative;
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

    .donut__card__mail{
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
    }

    .donut__card__remove{
        position: absolute;
        bottom: 60px;
        right: -7px;
        width: 30px;
        height: 30px;
        /* border-radius: 50%; */
        /* background-color: var(--white); */
        margin-top: 0.5em;
        margin-right: 0.5em;
        color: var(--pink--main);
        font-size: var(--font-size--medium);
        z-index: 5;
    }

    .donut__card__remove:hover{
        cursor: pointer;
        color: var(--blue--main);
    }

    .donut__card__mail__link{
        color: var(--pink--main);
        font-size: var(--font-size--large);
        width: 100%;
        height: 100%;
    }

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
