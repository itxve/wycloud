import axios from "./axios";
import { User } from "@/types";
import { Songs, CorrectSongs, PageInfoData } from "@/types";
import useLogin from "@/hooks/useLogin";
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

export function cloudList(limit: number = 30, offset: number = 0) {
  return axios
    .get(`/user/cloud${resolveParams({ t: Date.now(), limit, offset })}`)
    .then((res: any) => {
      const { count, hasMore, data } = res;
      return {
        count,
        hasMore,
        data: [].concat(data).map((e: any) => {
          return {
            album: e.album,
            artist: e.artist,
            songName: e.songName,
            songId: e.songId,
            albumUrl: e.simpleSong.al?.picUrl,
          };
        }) as Array<Songs>,
      } as PageInfoData<Array<Songs>>;
    });
}

export function songUrl(songId: string) {
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
  onUploadProgress?: AxiosRequestConfig["onUploadProgress"]
) {
  const realAxios = axios;
  return realAxios.post(`/cloud${resolveParams({ t: Date.now() })}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
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

export function lyric(songId: string) {
  return axios
    .get(`/lyric${resolveParams({ id: songId })}`)
    .then((data: any) => {
      return {
        lyric: data?.lrc?.lyric,
      };
    });
}

export function songDetail(songId: string) {
  return axios
    .get(`/song/detail${resolveParams({ ids: songId })}`)
    .then((data: any) => {
      const so = data.songs[0];
      return {
        name: so.name,
        cover: so.al.picUrl,
        artist: so.pc.ar,
      } as { name: string; cover: string; artist: string };
    });
}

export function logout() {
  return axios.get(`/logout`).then((data: any) => {
    return data;
  });
}
/**
 * 纠错
 * @param ysid  云盘Id
 * @param asid 正确信息Id
 * @returns
 */
export function cloudMatch(ysid: string, asid: string) {
  const { user } = useLogin();
  return axios
    .get(
      `/cloud/match${resolveParams({
        sid: ysid,
        uid: user.value?.userId,
        asid,
      })}`
    )
    .then((data: any) => {
      return data;
    });
}

export function searchList(keywords: string) {
  return axios
    .get(
      `/cloudsearch${resolveParams({
        t: Date.now(),
        keywords,
        limit: 100,
      })}`
    )
    .then((data: any) => {
      return data.result.songs.map((s: any) => {
        return {
          name: s.name,
          songId: s.id,
          artist: s?.ar.map((e: any) => e.name).join(" / "),
          album: {
            name: s?.al.name,
            picUrl: s?.al.picUrl,
          },
        };
      }) as Array<CorrectSongs>;
    });
}
