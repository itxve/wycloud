<template>
  <div class="contianer">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="云盘歌曲" name="one"><CloudSongs /></el-tab-pane>
      <el-tab-pane label="云盘上传" name="two"><UploadSong /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import CloudSongs from "@/components/CloudList.vue";
import UploadSong from "@/components/UploadSong.vue";
</script>

<script setup lang="ts">
const activeName = ref("one");
</script>

<style scoped></style>
