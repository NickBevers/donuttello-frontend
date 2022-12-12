<script setup>
import{ref} from "vue";
const shapes = ref([
    {
    name: "Vierkant",
    checked: false
    },
    {
    name: "Cirkel",
    checked: false
    },
    {
    name: "Rechthoek",
    checked: false
    },
    {
    name: "Ovaal",
    checked: false
    }
]);

const checked = ref(false);
const select = ref(false);

function selectTopping(shapes) {

  const listItems = document.querySelector(".confSidebar__item__section--listing").children;
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove("active");
  }

  console.log(shapes.name);

  shapes.checked = !shapes.checked;
  console.log(shapes.checked);

}

</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Selecteer logo shape</h3>
      <input class="confSidebar__item__checkbox"  type="checkbox" id="checkbox" v-model="checked" @click="checked = !checked" />
    </header>

    <section v-if="checked" class="confSidebar__item__section">
      <ul class="confSidebar__item__section--listing">
        <li v-for="shapes in shapes" :class="{active: shapes.checked}" class="listing__item" :key="shapes.name" @click="selectTopping(shapes)"> {{shapes.name}} </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

.listing__item {
    padding: 0;
    margin: 0 1em 1em 0;
    width: 4em;
    height: 4em;
    opacity: 0.5;
    background-color: #C4C03A;
    border-radius: 0.25rem;
    border: 1px solid rgb(220, 220, 220);
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