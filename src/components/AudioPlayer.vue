<template>
  <div id="audio"></div>
</template>

<script lang="ts">
// https://aplayer.js.org/#/zh-Hans/
import "aplayer/dist/APlayer.min.css";
import { onMounted, ref, Ref } from "vue";
import usePlayer from "@/hooks/usePlayer";
import { defineExpose } from "vue";
export type AudioPlayerExpose = {
  play(songId: string): Promise<void>;
};
</script>

<script setup lang="ts">
import { songUrl, songDetail, lyric } from "@/apis";
import { ElMessage } from "element-plus";
import { Audio } from "aplayer";
const { registerPlayer, addSong, switchSong, getList } = usePlayer();
const currentRef = ref<Audio>();

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
    if (
      ~getList().findIndex((s) => {
        console.log(s);
        return s.songId === songId;
      })
    ) {
      ElMessage.info("已在播放列表");
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
    const index = getList().length - 1;
    switchSong(index);
    //设置当前歌词的颜色
    currentRef.value = getList()[index];
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
