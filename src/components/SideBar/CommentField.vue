<script setup>
    import { ref } from 'vue';
    import { useDonutStore } from "../../stores/donutConf.js";

    const donutStore = useDonutStore();
    const textFieldInput = ref('');
    const checked = ref(false);


    const handleInput = () => {
        donutStore.setComment(textFieldInput.value);
    };
</script>

<template>
    <div class="confSidebar__item">
        <header class="confSidebar__item__header">
            <h3 class="confSidebar__item__header__heading">Extra wensen of opmerkingen (optioneel)</h3>
            <input class="confSidebar__item__checkbox"  type="checkbox" id="checkbox" v-model="checked" @click="checked = !checked" />
        </header>

        <section v-if="checked" class="confSidebar__item__section">
            <form action="">
                <textarea name="commentField" v-model="textFieldInput" @input="handleInput()" id="commentField" class="confSidebar__item--commentField" rows="10" >
                    Here is a text field
                </textarea>
            </form>
        </section>
    </div>
</template>

<style scoped>
.confSidebar__item--commentField{
    font-family: "Dosis", sans-serif;
}

.confSidebar__item__checkbox{
    -webkit-appearance: none;
    appearance: none;
    background: url("../../assets/images/arrow--down.svg");
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.25em;
    height: 1.25em;
    margin: 0.5em 0 0 0.5em;
    cursor: pointer;
    transition: transform 0.25s ease-in-out;
}
.confSidebar__item__checkbox:checked{
    transform: rotate(-180deg);
}

.confSidebar__item--commentField{
    font-family: 'Dosis', sans-serif;
    font-size: var(--font-size-medium);
    width: 100%;
}

</style>