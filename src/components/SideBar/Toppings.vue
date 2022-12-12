<script setup>
import{ref} from "vue";
import { useDonutStore } from "../../stores/donutConf.js";

const donutStore = useDonutStore();
const toppings = ref(["Geen", "bounty", "brownie", "caramel", "chocolateOrbs", "coconut", "glazeLines", "leo", "maltesers", "marshmallow", "nuts", "orangePeel", "oreo", "pistachio", "twix",]);
let topping = ref("Geen");
const checked = ref(false);

function selectTopping(chosenTopping) {
    topping.value = chosenTopping;
    donutStore.setTopping(topping.value);
}

function toggle() {
    checked.value = !checked.value;
}
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
        <h3 class="confSidebar__item__header__heading">Toppings</h3>
        <input class="confSidebar__item__checkbox"  type="checkbox" id="checkbox" v-model="checked" @click="toggle" />
    </header>

    <section v-if="checked" class="confSidebar__item__section">
      <ul class="confSidebar__item__section--listing">
        <li v-for="t in toppings" class="listing__item listing__item--topping" :class="{ 'active' : topping === t }" :key="t" @click="selectTopping(t)"> {{ t }} </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

.listing__item {
    padding: 0;
    margin: 0 1em 1em 0;
    width: 6em;
    height: 3.5em;
    opacity: 0.5;
    display: grid;
    place-items: center;
    background-color: var(--blue--pastel);
    border-radius: 0.25rem;
    border: 1px solid rgb(220, 220, 220);
    cursor: pointer;
    font-weight: var(--font-weight--semi-bold);
    color: var(--black);
}
.listing__item__image {
    padding: 0;
    width: 4em;
    height: 4em;
    border-radius: 0.5em;
    border: 1px solid var(--grey);
}
.active {
  color: #212529;
  background-color: #ffb0b3;
  opacity: 1;
  border: 1px solid rgb(211, 207, 207);
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
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
</style>