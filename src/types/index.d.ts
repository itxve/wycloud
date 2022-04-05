export type Songs = {
  album: string;
  artist: string;
  songName: string;
  songId: string;
  albumUrl: string;
  playUrl?: string;
};

export type LocalUpload = {
  uid: number;
  name: string;
  percent: number;
  result?: string;
};

