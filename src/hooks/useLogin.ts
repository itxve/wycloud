import { ref } from "vue";
import { userStore } from "@/utils";
import { User } from "@/types";

//全局唯一
const user = ref<User>(userStore.get());
export default function useLogin() {
  return {
    user,
    setUser: function (userInfo?: User) {
      if (userInfo) {
        user.value = userInfo;
        userStore.save(userInfo!);
      }
    },
    clearUser: function () {
      user.value = undefined;
      userStore.clear();
    },
  };
}
