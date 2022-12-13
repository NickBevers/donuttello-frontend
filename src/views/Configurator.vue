<script setup>
    import { ref } from 'vue'
    import Navigation from '../components/Navigation.vue';
    import ConfiguratorSidebar from '../components/ConfiguratorSidebar.vue';
    import DonutCanvas from '../components/DonutCanvas.vue';
    const status = ref("");
    const messageType = ref("");
    const donutLink = ref("");
    const donutAmount = ref(100);

    const logAll = (donut) => {
        // console.log(donut);
        // console.log(donut.filling); // filling  
        // console.log(donut.glaze); // glazeColor
        // console.log(donut.topping2); // toppings
        // console.log(donut.topping1); // sprinkles
        // console.log(donut.logoShape); // logoShape
        // console.log(donut.comment); // comment
        // console.log(donut.logo);
        // console.log(donut.name);
        // console.log(donut.company);
        // console.log(donut.email);
        // console.log(donut.phone);
        donut.amount = donutAmount.value;
        console.log(donut);

        if(donut.name.length < 1 || donut.company.length < 1 || donut.email.length < 1 || donut.phone.length < 1){
            setError("Please fill out all personal detail fields.");
            
        } else{
            fetch("https://donuttello-backend.onrender.com/api/v1/donuts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donut)
            }
            )
            .then((response) => response.json())
            .then((data) => {
                donutLink.value = `${window.location.origin}/detail/${data.url}`;
                status.value = "Your donut has been ordered. <br> Click here to copy the shareable link.";
            });
        }
    }

    function setError(message){
        status.value = message;
        messageType.value = "error";
        setTimeout(() => {
            status.value = "";
            messageType.value = "";
        }, 3000);
    }

    function copyLink(){
        navigator.clipboard.writeText(donutLink.value);
        status.value = "Link copied to clipboard.";
    }

    function updateDonutAmount(){
        if(donutAmount.value < 100){
            donutAmount.value = 100;
        } else if(donutAmount.value > 1000){
            donutAmount.value = 1000;
        }
    }

</script>

<template>
    <div class="home">
        <Navigation />
        <div class="configurator__container">
            <ConfiguratorSidebar @createDonut="logAll" />
            <div class="configurator__canvas">
                <DonutCanvas />
            </div>
        </div>

        <div class="donut__count">
            <label for="donutCount" class="donut__count__label">Amount: </label>
            <input type="number" name="donutCount" id="donutCount" class="donut__count__input" v-model="donutAmount" @change="updateDonutAmount">
        </div>

        <div class="configurator__status" :class="{ 'configurator__status--error' : messageType === 'error' }" @click="copyLink" v-if="status.length > 2">
            <p class="configurator__status__message" :innerHTML="status"></p>
        </div>
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

    .configurator__canvas{
        width: 72vw;
        height: calc(100vh - 5.7em);
    }

    .configurator__status{
        background-color: var(--green);
        width: 70ch;
        height: 5em;
        position: absolute;
        top: 8em;
        left: calc(50% - 35ch);
        border-radius: var(--border-radius);
        display: grid;
        place-items: center;
    }

    .configurator__status--error{
        background-color: var(--pink--main);
    }

    .configurator__status__message{
        color: var(--white);
        font-size: var(--font-size--medium);
        text-align: center;
    }

    .donut__count{
        position: absolute;
        top: 7em;
        left: 45em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
    }

    .donut__count__label{
        color: var(--pink--main);
        font-size: var(--font-size--medium);
        font-weight: var(--font-weight--bold);
        margin-bottom: 0.3em;
    }

    .donut__count input{
        width: 4em;
        height: 1.8em;
        border: none;
        border-radius: var(--border-radius);
        text-align: center;
        font-size: var(--font-size--medium);
        font-weight: var(--font-weight--bold);
        color: var(--white);
        background-color: var(--pink--main);
        border: none;
    }

    .donut__count__input:focus {
        outline: none;
    }

    .donut__count__input::-webkit-outer-spin-button,
    .donut__count__input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .donut__count__input[type=number] {
        -moz-appearance: textfield;
    }
</style>