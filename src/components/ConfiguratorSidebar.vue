<script setup>
    import { ref, watch } from 'vue';
    import { storeToRefs } from "pinia";
    import FillingList from './SideBar/FillingList.vue';
    import GlazeColour from './SideBar/GlazeColour.vue';
    import Toppings from './SideBar/Toppings.vue';
    import UploadLogo from './SideBar/UploadLogo.vue';
    import LogoShape from './SideBar/LogoShape.vue';
    import CommentField from './SideBar/CommentField.vue';
    import userData from './SideBar/UserData.vue';
    import { useDonutStore } from '../stores/donutConf.js';
    const donutStore = useDonutStore();
    const { glazeColor, toppings, sprinkles, logoShape, logo, comment, filling, donutName, companyName, email, phone } = storeToRefs(donutStore);

    const emit = defineEmits(['createDonut']);
    const createDonut = () => {
        // check for missing fields
        // show error message
        // if all fields are filled, emit event


        emit("createDonut", {
            filling: tempFilling.value,
            glaze: tempColor.value,
            topping2: tempTopping.value,
            topping1: tempSprinkles.value,
            logoShape: tempShape.value,
            comment: tempComment.value,
            logo: logo.value,
            name: tempDonutName.value,
            company: tempCompanyName.value,
            email: tempEmail.value,
            phone: tempPhone.value
        });
    }

    const tempFilling = ref("none");
    const tempColor = ref("#ffffff");
    const tempTopping = ref("none");
    const tempSprinkles = ref("none");
    const tempLogo = ref("");
    const tempShape = ref("rectangle");
    const tempComment = ref("");
    const tempDonutName = ref("");
    const tempCompanyName = ref("");
    const tempEmail = ref("");
    const tempPhone = ref("");


    watch(filling, (value) => {
        tempFilling.value = value;
    });

    watch(sprinkles, (value) => {
        tempSprinkles.value = value;
    });

    watch(glazeColor, (value) => {
        tempColor.value = value;
    });

    watch(toppings, (value) => {
        tempTopping.value = value;
    });

    watch(logo, (value) => {
        tempLogo.value = value;
    });

    watch(logoShape, (value) => {
        tempShape.value = value;
    });

    watch(comment, (value) => {
        tempComment.value = value;
    });

    watch(donutName, (value) => {
        tempDonutName.value = value;
    });

    watch(companyName, (value) => {
        tempCompanyName.value = value;
    });

    watch(email, (value) => {
        tempEmail.value = value;
    });

    watch(phone, (value) => {
        tempPhone.value = value;
    });



</script>

<template>
    <div class="confSidebar">
        <FillingList />
        <GlazeColour />
        <Toppings />
        <LogoShape />
        <UploadLogo />
        <CommentField />
        <userData />

        <div class="confSidebar__create_donut">
            <a class="confSidebar__button--create" @click="createDonut">Submit</a>
        </div>
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

    .confSidebar__create_donut{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15em;
        height: 3em;
        margin: 0 auto;
        position: absolute;
        top: 8.2em;
        right: 2em;
    }

    .confSidebar__button--create{
        width: 80%;
        height: 100%;
        display: grid;
        place-items: center;
        font-size: var(--font-size--small);
        font-weight: var(--font-weight--bold);
        border-radius: var(--border-radius);
        background-color: var(--pink--main);
        color: var(--white);
        text-transform: uppercase;
        cursor: pointer;
    }

    .confSidebar__button--create:hover{
        color: var(--yellow--main);
    }
</style>