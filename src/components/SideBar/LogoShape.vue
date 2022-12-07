<script setup>
import{ref} from "vue";
const shapes = ref([
    {
    name: "Vierkant",
    checked: false
    },
    {
    name: "Cirkelvormig",
    checked: false
    },
    {
    name: "Rechthoekig",
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

    </header>
    <section class="confSidebar__item__section">
      <ul class="confSidebar__item__section--listing">
        <li v-for="shapes in shapes" :class="{active: shapes.checked}" class="listing__item" :key="shapes.name" @click="selectTopping(shapes)">
          {{shapes.name}}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

</style>