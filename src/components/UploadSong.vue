<script lang="ts">
import { computed, ref } from "vue";
import ExtLink from "@/components/ExtLink.vue";
import type { UploadProps } from "element-plus";
import { upload } from "@/apis";
import { UploadFilled } from "@element-plus/icons-vue";
import { LocalUpload } from "@/types";
</script>

<script setup lang="ts">
const customColors = [
  { color: "#f56c6c", percentage: 20 },
  { color: "#e6a23c", percentage: 40 },
  { color: "#5cb87a", percentage: 60 },
  { color: "#1989fa", percentage: 80 },
  { color: "#49ac4d", percentage: 100 },
];
const isDev = computed(() => import.meta.env.DEV);
const files = ref<Array<LocalUpload>>([]);
const customUpload: UploadProps["httpRequest"] = ({ file }) => {
  const { uid, name } = file as any;
  files.value.push({ uid, name, percent: 0 });
  return new Promise(async (s, r) => {
    const formData = new FormData();
    formData.append("songFile", file);
    upload(formData, (evt) => {
      let num = ((evt.loaded / evt.total) * 100) | 0;
      //更改进度
      files.value.some((it) => {
        if (it.uid === uid) {
          it.percent = num;
          return true;
        }
        return false;
      });
    })
      .then((res: any) => {
        // //更改进度
        files.value.some((it) => {
          if (it.uid === uid) {
            it.result = "上传成功";
            return true;
          }
          return false;
        });
      })
      .then(s)
      .catch(r);
  });
};
const delSong = (uid: number) => {
  files.value = files.value.filter((it) => it.uid !== uid);
};
</script>

<template>
  <div class="contianer" style="width: 90vw">
    <ExtLink text="解锁付费音乐" href="https://demo.unlock-music.dev/" />
    <div>
      <el-upload
        action=""
        class="upload-demo"
        drag
        multiple
        :show-file-list="false"
        :http-request="customUpload"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
        <template #tip>
          <div class="el-upload__tip"></div>
        </template>
      </el-upload>
    </div>
    <div v-if="!isDev">线上,vercel有传输限制</div>
    <div>
      <el-table :data="files" style="width: 100%" key="songId" :height="500">
        <el-table-column prop="name" label="歌曲" />
        <el-table-column prop="percent" label="进度">
          <template #default="{ row }">
            <div class="percent">
              <el-progress
                style="width: 150px"
                :percentage="row.percent"
                :color="customColors"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="上传结果"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button v-if="row.percent === 100" @click="delSong(row.uid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.percent {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
</style>
