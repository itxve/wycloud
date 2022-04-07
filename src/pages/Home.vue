<script lang="ts">
import ActionTab from "../components/ActionTab.vue";
import Login from "@/components/Login.vue";
import useLogin from "@/hooks/useLogin";
import { logout } from "@/apis";
import UserAvatar from "@/components/UserAvatar.vue";
</script>

<script setup lang="ts">
const { user, clearUser } = useLogin();

const out = async () => {
  await logout();
  clearUser();
};
</script>

<template>
  <div class="contianer">
    <div v-if="!user?.nickname"><Login /></div>
    <div v-else class="info">
      <UserAvatar :nickname="user?.nickname" :avatar-url="user?.avatarUrl" />
      <el-popconfirm
        confirm-button-text="是的"
        cancel-button-text="我再想想"
        title="确认退出登陆吗？"
        @confirm="out"
      >
        <template #reference>
          <el-button>退出登陆</el-button>
        </template>
      </el-popconfirm>
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
