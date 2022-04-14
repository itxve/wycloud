<script setup lang="ts">
withDefaults(
  defineProps<{
    nickname?: string;
    avatarUrl?: string;
  }>(),
  {}
);
</script>
<script lang="ts"></script>

<template>
  <el-avatar
    alt="加载失败"
    shape="circle"
    :size="68"
    fit="cover"
    :src="avatarUrl"
  />
  <span>
    {{ nickname }}
  </span>
</template>

<style scoped></style>
