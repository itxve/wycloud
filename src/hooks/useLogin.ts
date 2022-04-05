import { ref, computed } from "vue";
import { User, clearUser, getUser, storeUser } from "../utils";

//全局唯一
const user = ref<User>(getUser());
export default function useLogin() {
  return {
    user: computed(() => user.value),
    setUser: function (userInfo?: User) {
      if (userInfo) {
        user.value = userInfo;
        storeUser(userInfo!);
      }
    },
    //二维码登陆追加Cookie
    addCookie: function (cookie: string) {
      user.value = Object.assign(user.value!, { cookie }) as User;
    },
    clearUser: function () {
      user.value = undefined;
      clearUser();
    },
  };
}
