<script setup>
    import { onMounted, onBeforeMount, ref } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import DashboardSidebar from '../components/Dashboard/DashboardSidebar.vue';
    import DonutList from '../components/Dashboard/DonutList.vue';
    import DonutCard from '../components/Dashboard/DonutCard.vue';
    import router from '../router';

    const jwtToken = ref(localStorage.getItem('jwtToken'));
    const donuts = ref([]);
    const filter = ref('all');
    const donutFilter = ref('');
    const isAdmin = ref(false);
    const removeMessage = ref('');
    const confirm = ref('');
    const layout = ref('list');
    const sort = ref('dateCreated');
    const order = ref('asc');

    if(!jwtToken.value) { router.push('/login'); }
    if(!new RegExp(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/).test(jwtToken.value)){ router.push('/login');}

    // fetch auth
    fetch(`https://donuttello-backend.onrender.com/api/v1/users/auth`, {
        method: "GET",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken.value}`
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

    const getDonuts = () => {
        fetch(`https://donuttello-backend.onrender.com/api/v1/donuts?filter=${donutFilter.value}&sort=${sort.value}&order=${order.value}`, {
            method: "GET",
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken.value}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                donuts.value = data.data;
            } else {
                // console.log(data);
            }
        });
    }

    onMounted(() => {
        getDonuts();
        
        // remove all canvas elements
        let canvas = document.getElementsByTagName('canvas');
        while (canvas[0]) canvas[0].parentNode.removeChild(canvas[0]);
    })

    function routeDetail(id) {
        router.push(`/detail/${id}`);
    }

    function removeDonut(){
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
                getDonuts();
                removeMessage.value = "The donut has been removed.";
                setTimeout(() => {
                    removeMessage.value = "";
                }, 4000);
            } else {
                console.log("something went wrong, please try again");
                // console.log(data);
            }
        });
    }

    function changeFilter() {
        switch (filter.value) {
            case 'all':
                donutFilter.value = '';
                break;
            case 'ordered':
                donutFilter.value = 'ordered';
                break;
            case 'inProduction':
                donutFilter.value = 'inProduction';
                break;
            case 'produced':
                donutFilter.value = 'produced';
                break;
            default:
                donutFilter.value = '';
                break;
        }
        getDonuts();
    }

    function confirmRemove() {
        confirm.value = "Are you sure you want to remove this donut?";
    }

    function updateSort(sortBy) {
        sort.value = sortBy;
        getDonuts();
    }

    function changeOrder(){
        if(order.value === 'asc'){
            order.value = 'desc';
        } else {
            order.value = 'asc';
        }
        getDonuts();
    }


</script>

<template>
    <div class="home">
        <Navigation />
        <div class="dashboard__container">
            <div class="filter__container">
                <div class="filter">
                    <label for="filter" class="filter__label">Filter: </label>
                    <select name="filter" class="filter__input" id="filter" v-model="filter" v-on:change="changeFilter()">
                        <option value="all" selected>Alles</option>
                        <option value="ordered">Besteld</option>
                        <option value="inProduction">In productie</option>
                        <option value="produced">Geproduceerd</option>
                    </select>
                </div>
            </div>

            <DashboardSidebar />

            <div class="donuts__container">
                <div class="donuts__container__title">
                    <h2 v-if="filter == 'all'">Alle Donuts</h2>
                    <h2 v-else-if="filter === 'ordered'">Open bestellingen</h2>
                    <h2 v-else-if="filter === 'inProduction'">In productie</h2>
                    <h2 v-else>Geproduceerd</h2>
                </div>

                <div class="donuts__container__sort">
                    <div class="donuts__container__sort--date">
                        <p class="sort--date sort__option" @click="updateSort('dateCreated')">Datum </p>
                        <font-awesome-icon :class="order==='asc' ? '' : 'icon__arrow--reverse'" class="icon__arrow" icon="fa-solid fa-angle-down" v-if="sort==='dateCreated'" @click="changeOrder"/>
                    </div>

                    <div class="donuts__container__sort--company">
                        <p class="sort--company sort__option" @click="updateSort('company')">Bedrijf</p>
                        <font-awesome-icon :class="order==='asc' ? '' : 'icon__arrow--reverse'" class="icon__arrow"  icon="fa-solid fa-angle-down" v-if="sort==='company'" @click="changeOrder"/> 
                    </div>

                    <div class="donuts__container__sort--status">
                        <p class="sort--status sort__option" @click="updateSort('orderStatus')">Status</p>
                        <font-awesome-icon :class="order==='asc' ? '' : 'icon__arrow--reverse'" class="icon__arrow"  icon="fa-solid fa-angle-down" v-if="sort==='orderStatus'" @click="changeOrder"/> 
                    </div>
                </div>

                <div class="donut__list__container" v-if="layout==='list'">
                    <div v-for="donut in donuts" :key="donut._id" class="donut__card">
                        <a @click="routeDetail(donut._id)" ><DonutList :donut="donut" @removeDonut="removeDonut" @confirmRemove="confirmRemove"/></a>
                    </div>
                </div>

                <div class="donut__card__container" v-else-if="layout==='grid'">
                    <div v-for="donut in donuts" :key="donut._id" class="donut__card">
                        <a @click="routeDetail(donut._id)" ><DonutCard :donut="donut" @removeDonut="removeDonut" @confirmRemove="confirmRemove"/></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="confirmRemove__container" v-if="confirm.length > 2">
            <div class="confirmRemove">
                <p class="confirmRemove__message" :innerHTML="confirm"></p>
                <div class="confirmRemove__buttons">
                    <a class="confirmRemove__button" @click="removeDonut">Yes</a>
                    <a class="confirmRemove__button" @click="confirm=''">No</a>
                </div>
            </div>
        </div>

        <div class="removeStatus" @click="copyLink" v-if="removeMessage.length > 2">
            <p class="removeStatus__message" :innerHTML="removeMessage"></p>
        </div>
    </div>
</template>

<style scoped>

    .filter{
        position: absolute;
        top: 8.7em;
        right: 5em;
    }

    .filter__label{
        font-size: var(--font-size--medium);
        font-weight: var(--font-weight-semibold);
        color: var(--pink--main);
    }

    .filter__input{
        margin-left: 1em;
        padding: 0.2em 0.5em;
        border: none;
        border-radius: 0.5em;
        background-color: var(--pink--main);
        color: var(--white);
        font-size: var(--font-size--small);
        font-weight: var(--font-weight-semibold);
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

    .donuts__container__title{
        margin: var(--margin-medium) 0;
        font-size: var(--font-size--xlarge);
        font-weight: var(--font-weight--bold);
        text-align: center;
    }

    .donuts__container__sort{
        display: flex;
        align-items: center;
        width: clamp(350px, 65%, 1800px);
        height: 3em;
        margin: 0 auto;
        font-weight: var(--font-weight--semi-bold);
        font-size: var(--font-size--small);
        box-sizing: border-box;
    }

    .donuts__container__sort--date{
        width: 4em;
        margin: 0 1em 0 1.8em;
        display: flex;

    }
    
    .donuts__container__sort--company{
        width: clamp(400px, 70%, 1200px);
        display: flex;
    }

    .donuts__container__sort--status{
        /* width: clamp(100px, 15%, 200px); */
        width: 5.5em;
        margin-right: calc(54px + 18ch + 2em);
        display: flex;
    }

    .sort__option{
        cursor: pointer;
        width: 3em;
    }

    .sort--date{
        width: 2.8em;
    }

    .icon__arrow{
        cursor: pointer;
        margin-top: 0.1em;
    }

    .icon__arrow:hover{
        color: var(--pink--main);
    }

    .icon__arrow--reverse{
        transform: rotate(180deg);
    }

    .donut__list__container{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5em;
        margin: 0 auto;
        /* margin-top: var(--margin-xlarge); */
        width: clamp(350px, 65%, 1800px);
    }

    .donut__card__container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5em;
        margin-top: var(--margin-xxxlarge);
    }
    
    a{
        cursor: pointer;
    }

    .removeStatus{
        background-color: var(--green);
        width: 70ch;
        height: 3em;
        position: absolute;
        top: 8em;
        left: calc(50% - 35ch);
        border-radius: var(--border-radius);
        display: grid;
        place-items: center;
    }

    .removeStatus__message{
        color: var(--white);
        font-size: var(--font-size--medium);
        text-align: center;
    }

    .confirmRemove__container{
        width: 100vw;
        height: 100vh;
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: grid;
        place-items: center;
    }

    .confirmRemove{
        background-color: var(--white);
        width: clamp(350px, 40%, 1800px);
        height: 10em;
        border-radius: var(--border-radius);
        display: grid;
        place-items: center;
    }

    .confirmRemove__message{
        font-size: var(--font-size--large);
        font-weight: var(--font-weight--semi-bold);
        text-align: center;
    }

    .confirmRemove__buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }

    .confirmRemove__button{
        background-color: var(--pink--main);
        color: var(--white);
        padding: 0.5em 1em;
        border-radius: var(--border-radius);
        font-size: var(--font-size--medium);
        font-weight: var(--font-weight--semi-bold);
        text-align: center;
        width: 8em;
        text-transform: uppercase;
    }

    .confirmRemove__button:hover{
        color: var(--yellow--main);
    }
</style>