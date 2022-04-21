<script lang="ts">
import { onMounted, ref } from "vue";
import { parseBlob } from "music-metadata-browser";
</script>

<script setup lang="ts">
const commonRef = ref();
const imgLick = (blob: any) => {
  const b = new Blob([blob.data], { type: blob.format });
  return URL.createObjectURL(b);
};

onMounted(() => {
  const fileInput = document.querySelector("#fe");
  fileInput?.addEventListener("change", function (e) {
    const feDom = e.target as any;
    console.log(" e.files[0];", feDom.files?.[0]);
    parseBlob(feDom.files?.[0]).then((res) => {
      const { common } = res;
      commonRef.value = common;
      console.log(common);
    });
  });
});
</script>

<template>
  <input id="fe" type="file" />
  <div class="music">
    <h2>music-metadata</h2>
    <div>
      title: <span>{{ commonRef?.title }}</span>
    </div>
    <div>
      album:<span>{{ commonRef?.album }}</span>
    </div>
    <div>
      artist:<span>{{ commonRef?.artist }}</span>
    </div>
    <div v-if="!!commonRef?.picture">
      <h3>picture</h3>
      <div v-for="p in commonRef?.picture">
        <img :src="imgLick(p)" />
      </div>
    </div>
  </div>
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
.music span {
  font-size: 20px;
  color: #4494d3;
  margin-left: 10px;
}
</style>
