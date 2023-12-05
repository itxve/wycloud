import { Audio } from "aplayer";
export type Songs = {
  album: string;
  artist: string;
  songName: string;
  songId: string;
  albumUrl: string;
  playUrl?: string;
};

export type CorrectSongs = Partial<{
  name: string;
  songId: string;
  artist: string;
  album: {
    name?: string;
    picUrl?: string;
  };
}>;

export type LocalUpload = {
  uid: number;
  name: string;
  percent: number;
  result?: string;
};

export type User =
  | {
      avatarUrl: string;
      nickname: string;
      //cookie :用于本地文件上传
      cookie: string;
      backgroundUrl: string;
      signature: string;
      userId: number;
    }
  | undefined;

export type PlayerStore = {
  [key: string]: any;
  audios: Array<Audio>;
};

export type PageInfoData<T> = {
  count: number;
  hasMore: boolean;
  data: T;
};
