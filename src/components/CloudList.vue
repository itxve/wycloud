<template>
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
          <el-image
            style="width: 120px; height: 120px"
            alt="加载失败"
            fit="cover"
            :src="row.albumUrl"
            :lazy="true"
          />
        </template>
      </el-table-column>
      <el-table-column prop="album" label="专辑" />
      <el-table-column prop="artist" label="歌手" />
      <el-table-column prop="songName" label="歌曲" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="playMusic(row.songId)">
            播放 <el-icon class="el-icon--right"><arrow-down /></el-icon
          ></el-button>
          <el-dropdown>
            <el-button>操作列表</el-button>
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
            <template #dropdown>
              <div class="dropdown-item">
                <el-button @click="clearLink(row.songId)">
                  清楚关联信息
                </el-button>
              </div>
              <div>
                <el-button @click="open(row)">云盘歌曲信息纠错</el-button>
              </div>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <CorrectionSong
      ref="correctionRef"
      :album="rowRef?.album"
      :artist="rowRef?.artist"
      :name="rowRef?.songName"
      :ysid="rowRef?.songId"
      :fetchSongs="fetchSongs"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineExpose, inject, Ref } from "vue";
import { cloudList, cloudDel, cloudMatch } from "@/apis";
import type { AudioPlayerExpose } from "@/components/AudioPlayer.vue";
import CorrectionSong from "@/components/CorrectionSong.vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { Songs } from "@/types";
export type CloudList = {
  fetchSongs: () => void;
};
</script>

<script setup lang="ts">
const songs = ref<Array<Songs>>();
const listLoading = ref(false);
const audioRef = inject<Ref<AudioPlayerExpose>>("play");
const rowRef = ref();
const correctionRef = ref();

const open = (row: Songs) => {
  rowRef.value = row;
  correctionRef.value.toggle();
};

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

const clearLink = (songId: string) => {
  cloudMatch(songId, "0").then((re) => {
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
.dropdown-item {
  margin: 5px;
}
</style>
