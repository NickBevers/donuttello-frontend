<script setup>
import { ref } from 'vue'
// make array of flavours
const flavours = ref([
    {
      flavour: 'pistache',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'snickers',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'oreo',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'limoen',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'kokos',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'kersen',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'caramel creampudding',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'kaneel',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'salted caramel',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'double chocolate',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'donuttella',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'cappuccino',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'brownie',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'banaan',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'aardbei',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'rijstpap',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'peanut butter jelly',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'ruby',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'sugared',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'speculoos',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'malteser',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'pim\'s',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'twix',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'dark strawberry',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'leo',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    },
    {
      flavour: 'bounty',
      image: 'https://www.averiecooks.com/wp-content/uploads/2016/03/bananabreaddonuts-6.jpg'
    }
]);
</script>
<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">Glace flavour</h3>

    </header>
    <section class="confSidebar__item__section">
      <ul class="confSidebar__item__section--listing">
        <li v-for="flavour in flavours" class="listing__item">
          {{flavour.flavour}}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

</style>