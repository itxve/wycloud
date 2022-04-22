<template>
  <el-dialog
    title="云盘歌曲信息纠错"
    width="50%"
    v-model="visible"
    :before-close="close"
  >
    <div class="check-box-custom">
      <el-checkbox-group v-model="checkRef">
        <el-checkbox-button
          v-for="it in [name, artist, album]"
          :label="it"
          :key="it"
          >{{ it }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="serach">
      <el-input v-model="keywords"></el-input
      ><el-button @click="search">搜索</el-button>
    </div>
    <el-table :data="songs" style="width: 100%" key="songId" :height="500">
      <el-table-column label="专辑">
        <template #default="{ row }">
          <el-image :lazy="true" :src="row.album.picUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="歌手" />
      <el-table-column prop="name" label="歌曲" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="match(row.songId)">关联歌曲信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { CorrectSongs } from "@/types";
import { onMounted, ref, watch } from "vue";
import { searchList, cloudMatch } from "@/apis";
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    album?: string;
    artist?: string;
    name?: string;
    ysid?: string;
    fetchSongs: Function;
  }>(),
  {}
);

const visible = ref(false);

const checkRef = ref<Array<String>>();

const keywords = ref();

const songs = ref<Array<CorrectSongs>>();

const match = (asid: string) => {
  if (props?.ysid && asid) {
    cloudMatch(props?.ysid, asid).then(() => {
      close();
      props.fetchSongs();
    });
  }
};

const search = () => {
  if (keywords.value) {
    searchList(keywords.value).then((r) => {
      songs.value = r;
    });
  }
};

watch(checkRef, () => {
  keywords.value = checkRef.value?.join(" ");
});

onMounted(() => {
  search();
});

const toggle = () => {
  visible.value = !visible.value;
};
const close = () => {
  visible.value = false;
  checkRef.value = [];
  songs.value = [];
};

defineExpose({ toggle });
</script>

<style scoped>
.check-box-custom :deep(.el-checkbox-button) {
  margin: 3px;
  border: 1px solid var(--el-border) !important;
}
.serach {
  margin: 8px 0 8px 0;
  display: flex;
  justify-content: space-between;
}
</style>
