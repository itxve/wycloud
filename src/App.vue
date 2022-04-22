<script setup lang="ts">
import { ref, provide } from "vue";
import Entry from "@/pages/entry.vue";
import useAppProgress from "@/hooks/useAppProgress";
import AudioPlayer, { AudioPlayerExpose } from "@/components/AudioPlayer.vue";
const audioPlayerRef = ref<AudioPlayerExpose>();
import MetaData from "@/pages/MetaData.vue";
//注入一个全局播放的方法 好像可以直接用hook里面用个全局的ref就好了
provide("play", audioPlayerRef);
const { loading } = useAppProgress();
</script>

<template>
  <!-- <MetaData /> -->
  <Entry />
  <AudioPlayer ref="audioPlayerRef" />
  <el-progress
    class="progress"
    v-if="loading != 0"
    :indeterminate="true"
    :percentage="50"
    :format="() => ''"
  />
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

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: -10px;
}
.progress :deep(.el-progress-bar) {
  width: 120vw;
}

.progress :deep(.el-progress-bar__outer) {
  height: 3px !important;
}
</style>
