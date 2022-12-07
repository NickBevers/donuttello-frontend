<script setup>
import{ref} from "vue";

const toppings = ref([
  {
    name: "Optie 1",
    checked: false
  },
  {
    name: "Optie 2",
    checked: false
  },
  {
    name: "Optie 3",
    checked: false
  },
  {
    name: "Optie 4",
    checked: false
  },
  {
    name: "Optie 5",
    checked: false
  },
  {
    name: "Optie 6",
    checked: false
  },
  {
    name: "Optie 7",
    checked: false
  },
  {
    name: "Optie x",
    checked: false
  }
]);

const checked = ref(false);

const select = ref(false);
function selectTopping(toppings) {

  const listItems = document.querySelector(".confSidebar__item__section--listing").children;
  console.log(listItems.length);
  for (let i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove("active");
  }

  console.log(toppings.name);

  toppings.checked = !toppings.checked;
  console.log(toppings.checked);

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