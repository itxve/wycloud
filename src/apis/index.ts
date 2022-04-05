import axios, { dev as devAxios } from "./axios";
import { User, getUser } from "../utils";
import { Songs } from "../types";
import { AxiosRequestConfig } from "axios";

function resolveParams(params: Record<string, any>) {
  return Object.keys(params)
    .map((k, i) => `${i == 0 ? "?" : "&"}${k}=${params[k]}`)
    .join("");
}

export function login(phone: string, password: string) {
  return axios
    .get(
      `/login/cellphone${resolveParams({
        phone,
        password,
      })}`
    )
    .then((data: any) => {
      const {
        nickname,
        avatarUrl,
        backgroundUrl,
        signature,
        userId,
      } = data.profile;
      const { cookie } = data;
      return {
        nickname,
        avatarUrl,
        cookie,
        backgroundUrl,
        signature,
        userId,
      } as User;
    });
}

export function cloudList() {
  return axios.get("/user/cloud?t" + Date.now()).then(({ data }) => {
    return [].concat(data).map((e: any) => {
      return {
        album: e.album,
        artist: e.artist,
        songName: e.songName,
        songId: e.songId,
        albumUrl: e.simpleSong.al.picUrl,
      };
    }) as Array<Songs>;
  });
}

export function cloudDetail(songId: string) {
  return axios
    .post(`/song/url${resolveParams({ id: songId })}`)
    .then(({ data }) => {
      const songs = data;
      return songs[0]?.url as string;
    });
}

export function cloudDel(songId: string) {
  const id = songId;
  return axios
    .post(`/user/cloud/del${resolveParams({ id: songId })}`)
    .then((data) => {
      const succIds: Array<string> = (data as any).succIds;
      if (~succIds.findIndex((it) => it === id)) {
        return { msg: "删除成功" };
      } else {
        return { msg: "删除失败" };
      }
    });
}

export function upload(
  data: FormData,
  dev: boolean,
  onUploadProgress?: AxiosRequestConfig["onUploadProgress"]
) {
  const realAxios = dev ? devAxios : axios;
  const u = getUser()!;
  return realAxios.post(`/cloud`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      CK: u.cookie,
    },
    onUploadProgress,
  });
}

export function loginQrKey() {
  return axios
    .get(`/login/qr/key${resolveParams({ t: Date.now() })}`)
    .then((data: any) => {
      return data.data.unikey;
    });
}

export function loginQrCreate(unikey: string, baseimg: Boolean) {
  return axios
    .get(
      `/login/qr/create${resolveParams({
        t: Date.now(),
        key: unikey,
        qrimg: baseimg,
      })}`
    )
    .then((data) => {
      return data.data;
    });
}

export function loginQrCheck(unikey: string) {
  return axios
    .get(`/login/qr/check${resolveParams({ t: Date.now(), key: unikey })}`)
    .then((data) => {
      return data;
    });
}

export function accountInfo() {
  return axios.get(`/user/account`).then((data: any) => {
    const { profile } = data;
    return {
      avatarUrl: profile.avatarUrl,
      nickname: profile.nickname,
      cookie: "",
      backgroundUrl: profile.backgroundUrl,
      signature: profile.signature,
      userId: profile.userId,
    } as User;
  });
}
