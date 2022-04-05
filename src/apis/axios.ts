import axios, { AxiosResponse } from "axios";
import { ElNotification } from "element-plus";

const instance = axios.create({
  timeout: 50 * 1000,
  baseURL: "https://netease-cloud-music-api-ebon-psi.vercel.app",
  withCredentials: true,
});

const responseHandel = async (response: AxiosResponse) => {
  console.log("response.status ", response.status);
  if (response.status == 200) {
  } else if ([404, 500].includes(response.status)) {
    ElNotification.error({
      message: response.data,
      offset: 100,
    });
  }
  return response.data;
};
instance.interceptors.response.use(responseHandel);

export default instance;

/**
 * 开发
 */
const dev = axios.create({
  timeout: 100 * 1000,
  baseURL: "/up",
  withCredentials: true,
});
dev.interceptors.response.use(responseHandel);

export { dev };
