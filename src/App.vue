<script setup lang="ts">
import { ref, provide } from "vue";
import Entry from "@/pages/entry.vue";
import AudioPlayer, { AudioPlayerExpose } from "@/components/AudioPlayer.vue";
const audioPlayerRef = ref<AudioPlayerExpose>();
//注入一个全局播放的方法 好像可以直接用hook里面用个全局的ref就好了
provide("play", audioPlayerRef);
</script>

<template>
  <Entry />
  <AudioPlayer ref="audioPlayerRef" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
