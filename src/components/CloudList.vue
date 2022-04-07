<template>
  <meting-js id="1447279983" server="netease" type="song"> </meting-js>
  <div class="contianer" style="width: 90vw">
    <el-table
      v-loading="listLoading"
      :data="songs"
      style="width: 100%"
      key="songId"
      :height="500"
    >
      <el-table-column prop="albumUrl" label="封面">
        <template #default="{ row }">
          <el-avatar
            alt="加载失败"
            :size="48"
            fit="cover"
            :src="row.albumUrl"
          />
        </template>
      </el-table-column>
      <el-table-column prop="album" label="专辑" />
      <el-table-column prop="artist" label="歌手" />
      <el-table-column prop="songName" label="歌曲" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="playMusic(row.songId)"> 播放 </el-button>
          <el-popconfirm
            confirm-button-text="是的"
            cancel-button-text="不了"
            icon-color="red"
            title="确定删除这首歌吗?"
            @confirm="delMusic(row.songId)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineExpose, inject, Ref } from "vue";
import { cloudList, cloudDel } from "@/apis";

import type { AudioPlayerExpose } from "@/components/AudioPlayer.vue";
import { Songs } from "@/types";
export type CloudList = {
  fetchSongs: () => void;
};
</script>

<script setup lang="ts">
const songs = ref<Array<Songs>>();
const listLoading = ref(false);
const audioRef = inject<Ref<AudioPlayerExpose>>("play");

const fetchSongs = () => {
  listLoading.value = true;
  cloudList()
    .then((data) => {
      songs.value = data;
    })
    .finally(() => (listLoading.value = false));
};

const playMusic = (songId: string) => {
  audioRef?.value?.play(songId);
};

const delMusic = (songId: string) => {
  cloudDel(songId).then(() => {
    fetchSongs();
  });
};

defineExpose({ fetchSongs });

onMounted(() => {
  fetchSongs();
});
</script>

<style scoped>
.audio {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
