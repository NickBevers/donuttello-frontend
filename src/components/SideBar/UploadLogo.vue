<script setup>
    import { ref, onMounted } from "vue";
    import { useDonutStore } from "../../stores/donutConf.js";
    const donutStore = useDonutStore();
    const checked = ref(false);
    let imageUrl = ref("");

    function setImage(url) {
        imageUrl.value = url;
        donutStore.setLogo(imageUrl.value);
    }

    const uploadImage = () => {
        const file = document.getElementById("fileUpload").files[0];
        let formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            setImage(data.secure_url);
            document.querySelector(".input__file__label").innerHTML = file.name;
        });
    };



</script>

<template>
  <div class="confSidebar__item">
    <header class="confSidebar__item__header">
      <h3 class="confSidebar__item__header__heading">(Bedrijfs)logo</h3>
      <input class="confSidebar__item__checkbox" type="checkbox" id="checkbox" v-model="checked" @click="checked = !checked" />
      <!-- <input type="checkbox" id="checkbox" v-model="checked" @click="toggle = !toggle"/> -->
    </header>
    <section class="confSidebar__item__section" v-if="checked">
      <label for="fileUpload" class="input__file__label">
        Upload hier jouw logo <br>
        We accepteren png's, jpg's, jpeg's and webp's
      </label>
      <input class="input__file" type="file" id="fileUpload" name="fileUpload" @change="uploadImage">
    </section>
  </div>
</template>

<style scoped>
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