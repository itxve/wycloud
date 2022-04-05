<template>
  <div id="audio"></div>
</template>

<script lang="ts">
import "aplayer-ts/dist/APlayer.min.css";
import APlayer from "aplayer-ts";
import { onMounted } from "vue";
</script>

<script setup lang="ts">
onMounted(() => {
  const ap = new APlayer({
    container: document.getElementById("audio")!,
    audio: [
      {
        name: "name",
        artist: "artist",
        url: "url.mp3",
        cover: "cover.jpg",
      },
    ],
  });
});
</script>

<style scoped></style>
