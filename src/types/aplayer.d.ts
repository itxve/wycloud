declare module "aplayer" {
  type FullScreenType = "web" | "browser";

  export class Audio {
    songId: string;
    name: string;
    url: string;
    artist?: string;
    cover?: string;
    lrc?: string;
    theme?: string;
    type?: string;
    customAudioType?: Record<string, void>;
  }

  interface APlayerOptions {
    container?: HTMLElement;
    fixed?: boolean;
    mini?: boolean;
    autoplay?: boolean;
    theme?: string;
    loop?: "all" | "one" | "none";
    order?: "list" | "random";
    preload?: "none" | "metadata" | "auto";
    volume?: number;
    mutex?: boolean;
    listFolded?: boolean;
    listMaxHeight?: String;
    //1:in js,2:in html,3 in file
    lrcType?: number;
    audio?: any;
    storageName?: string;
    customAudioType?: Record<string, void>;
    customInit?: (player: any, src: APlayerOptions) => Promise<any>;
  }

  interface FullScreen {
    request(type: FullScreenType): void;

    cancel(type: FullScreenType): void;
  }

  export default class APlayer {
    events: any;
    audio: HTMLAudioElement;
    fullScreen: FullScreen;

    constructor(options: APlayerOptions);

    play(): void;

    pause(): void;

    seek(time: number): void;

    toggle(): void;

    on(event: string, handler: (data: any) => void): void;

    volume(percentage: number, nostorage: boolean, nonotice: boolean): void;

    theme(color: string, index: number): void;

    setMode(mode: "normal" | "mini"): void;

    mode(): string;

    notice(text: string, time?: number, opacity?: number): void;

    skipBack(): void;

    skipForward(): void;

    destroy(): void;

    lrc: {
      show(): void;
      hide(): void;
      toggle(): void;
    };

    list: {
      show(): void;
      hide(): void;
      toggle(): void;
      add(audios: Array<Audio> | Audio): void;
      remove(index: number): void;
      switch(index: number): void;
      audios: Array<Audio>;
    };
  }
}
