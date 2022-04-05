import { onMounted, onUnmounted, ref } from "vue";
import { loginQrKey, loginQrCreate, loginQrCheck, accountInfo } from "@/apis";
type State = {
  message: string;
  cookie: string;
  express: Boolean;
};
import useLogin from "@/hooks/useLogin";
export default function useQr() {
  const { user, setUser } = useLogin();
  const qrImg = ref("");
  const qrInterval = ref();
  const qrState = ref<State>();
  const getImg = () => {
    loginQrKey().then((unikey) => {
      loginQrCreate(unikey, true).then((data) => {
        qrImg.value = data.qrimg;
      });
      setInterver(unikey);
    });
  };
  const setInterver = (unikey: string) => {
    clearInterval(qrInterval.value);
    qrInterval.value = setInterval(() => {
      loginQrCheck(unikey).then((data: any) => {
        const state = data as State;
        if (state.cookie) {
          accountInfo().then((res) => {
            setUser(Object.assign(user.value!, res, { cookie: state.cookie }));
            clearInterval(qrInterval.value);
          });
        }
        data.express = data.code === 800;
        if (data.express) {
          data.message = "二维码不存在或过期，请刷新";
          qrState.value = data as State;
          clearInterval(qrInterval.value);
        } else {
          qrState.value = data as State;
        }
      });
    }, 1000);
  };

  onMounted(async () => {
    await getImg();
  });
  onUnmounted(() => {
    clearInterval(qrInterval.value);
  });
  return {
    qr: qrImg,
    state: qrState,
    getImg,
  };
}
