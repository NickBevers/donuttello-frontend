<script setup>

    const props = defineProps({
        url: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        }
    });

    async function downloadImage(url) {
        const image = await fetch(url)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL
        link.download = `${props.fileName}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
</script>

<template>
    <div class="btn__container--download">
        <a class="btn--download" @click.stop="downloadImage(props.url)">Download het logo</a>
    </div>
</template>

<style scoped>

    .btn__container--download{
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }
    .btn--download{
        background-color: var(--pink--main);
        border-radius: var(--border-radius);
        font-size: var(--font-size--xsmall);
        font-weight: var(--font-weight--semi-bold);
        color: var(--white);
        padding: 0.5em 1em;
        width: 17ch;
        text-align: center;
    }

    .btn--download:hover{
        color: var(--yellow--main);
    }
</style>