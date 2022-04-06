<template>
  <div class="contianer">
    <el-tabs v-model="activeName" class="demo-tabs" :before-leave="beforeLeave">
      <el-tab-pane label="云盘歌曲" name="one"
        ><CloudSongs ref="cloudListRef"
      /></el-tab-pane>
      <el-tab-pane label="云盘上传" name="two"><UploadSong /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import CloudSongs, { CloudList } from "@/components/CloudList.vue";
import UploadSong from "@/components/UploadSong.vue";
import type { TabsProps } from "element-plus";
</script>

<script setup lang="ts">
const activeName = ref("one");
const cloudListRef = ref<CloudList>();
//刷新列表
const beforeLeave: TabsProps["beforeLeave"] = (actvie) => {
  if (actvie === "one") {
    cloudListRef.value?.fetchSongs();
  }
};
</script>

<style scoped></style>
