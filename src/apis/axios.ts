import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElNotification } from "element-plus";
import useAppProgress from "@/hooks/useAppProgress";
const { addLoading, endLoading } = useAppProgress();
const instance = axios.create({
  timeout: 180 * 1000,
  baseURL: import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://netease-cloud-music-api-ebon-psi.vercel.app",
  withCredentials: true,
});

const requestHandel = async (confiig: AxiosRequestConfig) => {
  addLoading();
  return confiig;
};

const responseHandel = async (response: AxiosResponse) => {
  console.log(" endLoading(); endLoading(); endLoading();");
  endLoading();
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

instance.interceptors.request.use(requestHandel, () => {});
instance.interceptors.response.use(responseHandel, () => {
  endLoading();
});

export default instance;
