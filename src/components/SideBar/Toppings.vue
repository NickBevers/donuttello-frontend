<script setup>
import{ref} from "vue";
import { useDonutStore } from "../../stores/donutConf.js";

const donutStore = useDonutStore();

const toppings = ref([
  {
    name: "bounty",
    checked: false
  },
  {
    name: "brownie",
    checked: false
  },
  {
    name: "caramel",
    checked: false
  },
  {
    name: "chocolateOrbs",
    checked: false
  },
  {
    name: "coconut",
    checked: false
  },
  {
    name: "coffeeBean",
    checked: false
  },
  // {
  //   name: "glazeFullDonut",
  //   checked: false
  // },
  {
    name: "glazeLines",
    checked: false
  },
  {
    name: "leo",
    checked: false
  },
  {
    name: "maltesers",
    checked: false
  },
  {
    name: "marshmallow",
    checked: false
  },
  {
    name: "nuts",
    checked: false
  },
  {
    name: "orangePeel",
    checked: false
  },
  {
    name: "oreo",
    checked: false
  },
  {
    name: "pistachio",
    checked: false
  },
  {
    name: "twix",
    checked: false
  },

]);

const checked = ref(false);

const select = ref(false);
function selectTopping(toppings) {

  const listItems = document.querySelector(".confSidebar__item__section--listing").children;
  for (let i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove("active");
  }
  const topping = toppings.name;
  //console.log(toppings.name);
  donutStore.setToppings(topping);

  toppings.checked = !toppings.checked;
  //console.log(toppings.checked);

}
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Toppings</h3>
      <input type="checkbox" id="checkbox" v-model="checked" @click="toggle = !toggle"/>

    </header>
    <section v-if="toggle" class="confSidebar__item__section">
      <ul class="confSidebar__item__section--listing">

        <li v-for="toppings in toppings" :class="{active: toppings.checked}" class="listing__item" :key="toppings.name" @click="selectTopping(toppings)">
            {{toppings.name}}
        </li>

      </ul>
    </section>
  </div>
</template>

<style scoped>
.active {
  color: #212529;
  background-color: #ffb0b3;
  opacity: 1;
  border: 1px solid rgb(211, 207, 207);
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
}
</style>