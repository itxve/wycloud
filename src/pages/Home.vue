<script lang="ts">
import ActionTab from "../components/ActionTab.vue";
import Login from "@/components/Login.vue";
import useLogin from "@/hooks/useLogin";
</script>

<script setup lang="ts">
const { user, clearUser } = useLogin();
</script>

<template>
  <div class="contianer">
    <div v-if="!user?.nickname"><Login /></div>
    <div v-else class="info">
      <el-avatar
        alt="加载失败"
        shape="circle"
        :size="68"
        fit="cover"
        :src="user?.avatarUrl"
      />
      <span>
        {{ user?.nickname }}
      </span>
      <el-button @click="() => clearUser()">退出</el-button>
      <ActionTab />
    </div>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.nickname {
  font-size: 18px;
}
</style>
