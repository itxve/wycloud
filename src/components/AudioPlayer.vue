<template>
  <div id="audio"></div>
</template>

// https://aplayer.js.org/#/zh-Hans/
<script lang="ts">
import "aplayer/dist/APlayer.min.css";
import { onMounted } from "vue";
import usePlayer from "@/hooks/usePlayer";
import { defineExpose } from "vue";
export type AudioPlayerExpose = {
  play(songId: string): Promise<void>;
};
</script>

<script setup lang="ts">
import { songUrl, songDetail, lyric } from "@/apis";
import { ElMessage } from "element-plus";
const { registerPlayer, addSong, switchSong, getList } = usePlayer();

onMounted(() => {
  registerPlayer({
    container: document.getElementById("audio")!,
    audio: [],
    lrcType: 1,
    fixed: true,
  });
});
const play = async (songId: string) => {
  const url = await songUrl(songId);
  const del = await songDetail(songId);
  const lyc = await lyric(songId);
  if (
    ~getList().findIndex((s) => {
      console.log(s);
      return s.songId === songId;
    })
  ) {
    ElMessage.info("播放列表");
    return;
  }
  addSong({
    songId,
    name: del.name,
    url,
    artist: del.artist,
    cover: del.cover,
    lrc: lyc.lyric,
  });
  //播放新添加的
  switchSong(getList().length - 1);
};

defineExpose({
  play,
});
</script>

<style scoped></style>
