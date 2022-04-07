import { ref } from "vue";
import { User, clearUser, getUser, storeUser } from "../utils";


//全局唯一
const user = ref<User>(getUser());
export default function useLogin() {
  return {
    user,
    setUser: function (userInfo?: User) {
      if (userInfo) {
        user.value = userInfo;
        storeUser(userInfo!);
      }
    },
    clearUser: function () {
      user.value = undefined;
      clearUser();
    },
  };
}
