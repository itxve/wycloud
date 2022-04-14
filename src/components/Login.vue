<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/apis";
import useLogin from "@/hooks/useLogin";
import useQr from "@/hooks/useQr";
import { Loading } from "@element-plus/icons-vue";
import UserAvatar from "@/components/UserAvatar.vue";
const phone = ref("");
const password = ref("");
const { setUser } = useLogin();
const activeName = ref("qr");
const { qr, state, getImg } = useQr();
const onLogin = () => {
  login(phone.value, password.value).then((data) => {
    setUser(data);
  });
};

const loadNewQr = () => {
  getImg();
  qr.value = "";
  state.value = {};
};
</script>

<template>
  <div class="container">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="二维码登陆" name="qr">
        <div class="flex-center">
          <span>请使用网易云客户端扫描</span>
          <div class="qr-img" style="margin-top: 15px">
            <el-image v-if="state?.code !== 802" :src="qr">
              <template #error>
                <div class="qr-slot">
                  <el-icon class="is-loading"><Loading animationend /></el-icon>
                </div>
              </template>
            </el-image>
            <div v-if="state?.code === 800" class="qr-main qr-opacity">
              <div class="flex-center">
                <span style="font-size: 14px; font-weight: 800">{{
                  state?.message
                }}</span>
                <el-button
                  type="primary"
                  size="small"
                  @click="() => loadNewQr()"
                >
                  刷新二维码
                </el-button>
              </div>
            </div>
            <div v-if="state?.code === 802" class="qr-main flex-center u-head">
              <UserAvatar
                :nickname="state?.nickname"
                :avatar-url="state?.avatarUrl"
              />
              <span>请在手机上确认</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账号密码登陆" name="ps">
        <el-form
          ref="ruleFormRef"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="phone" prop="phone">
            <el-input v-model="phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input v-model="password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onLogin">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
}
.qr-slot {
  width: 194px;
  height: 194px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qr-img {
  position: relative;
}

.qr-opacity {
  background: rgba(255, 255, 255, 0.8);
}
.qr-main {
  position: absolute;
  top: 0;
  flex-direction: column;
  width: 180px;
  height: 180px;
  display: flex;
  z-index: 100;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

.u-head {
  position: relative;
}
</style>
