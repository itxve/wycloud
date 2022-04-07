import axios, { AxiosResponse } from "axios";
import { ElNotification } from "element-plus";

const instance = axios.create({
  timeout: 50 * 1000,
  baseURL: import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://netease-cloud-music-api-ebon-psi.vercel.app",
  withCredentials: true,
});

const responseHandel = async (response: AxiosResponse) => {
  if (response.status == 200) {
    if ([404, 400, 500, 502].includes(response.data.code)) {
      ElNotification.error({
        message: response.data.msg,
        offset: 100,
      });
      return;
    } else {
      return response.data;
    }
  }
};
instance.interceptors.response.use(responseHandel);

export default instance;
