<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/apis";
import useLogin from "@/hooks/useLogin";
import useQr from "@/hooks/useQr";
import { Loading, RefreshLeft } from "@element-plus/icons-vue";
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
  state.value = {
    message: "",
    cookie: "",
    express: false,
  };
};
</script>

<template>
  <div class="container">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="二维码登陆" name="qr">
        <div class="qr">
          <span>请使用网易云客户端扫描</span>
          <div class="qr-img" style="margin-top: 15px">
            <el-image :src="qr">
              <template #error>
                <div class="qr-slot">
                  <el-icon class="is-loading"><Loading animationend /></el-icon>
                </div>
              </template>
            </el-image>
            <el-icon
              :size="30"
              @click="() => loadNewQr()"
              v-if="state?.express"
              class="qr-refresh"
              ><RefreshLeft
            /></el-icon>
          </div>
          <span style="margin-top: 15px">{{ state?.message }}</span>
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
.qr {
  display: flex;
  flex-direction: column;
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

.qr-refresh {
  background-color: aliceblue;
  opacity: 0.75;
  position: absolute;
  top: 0;
  width: 194px;
  height: 194px;
  display: flex;
  z-index: 100;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
</style>
