<template>
  <div id="audio"></div>
</template>

<script lang="ts">
// https://aplayer.js.org/#/zh-Hans/
import "aplayer/dist/APlayer.min.css";
import { onMounted, ref } from "vue";
import usePlayer from "@/hooks/usePlayer";
import { defineExpose } from "vue";
export type AudioPlayerExpose = {
  play(songId: string): Promise<void>;
};
</script>

<script setup lang="ts">
import { songUrl, songDetail, lyric } from "@/apis";
const {
  registerPlayer,
  addSong,
  switchSong,
  getList,
  currentRef,
} = usePlayer();

onMounted(() => {
  registerPlayer({
    container: document.getElementById("audio")!,
    audio: [],
    lrcType: 1,
    fixed: true,
  });
});
const play = async (songId: string) => {
  try {
    const url = await songUrl(songId);
    const del = await songDetail(songId);
    const lyc = await lyric(songId);
    if (songId === currentRef.value?.songId) {
      return;
    }
    let index = 0;
    const songIndex = getList().findIndex((s) => {
      return s.songId === songId;
    });
    //找到了播放当前这首歌
    if (~songIndex) {
      index = songIndex;
    } else {
      addSong({
        songId,
        name: del.name,
        url,
        artist: del.artist,
        cover: del.cover,
        lrc: lyc.lyric,
      });
      //播放新添加的
      index = getList().length - 1;
    }
    switchSong(index);
  } catch (error) {
  } finally {
  }
};

defineExpose({
  play,
});
</script>

<style scoped>
#audio :deep(.aplayer-lrc-current) {
  color: v-bind("currentRef?.theme");
  font-size: 14px;
}
</style>
