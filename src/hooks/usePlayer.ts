import { ref } from "vue";
import APlayer, { APlayerOptions, Audio } from "aplayer";
import useImageColor from "@/hooks/useImageColor";
import { songUrl, songDetail, lyric } from "@/apis";
import { playerStore } from "@/utils";

export default function usePlayer(store = "my-aplayer") {
  const pStore = playerStore(store);
  const { getImageColor } = useImageColor();
  const player = ref<APlayer>();
  const currentRef = ref<Audio>();
  const registerPlayer = (options: APlayerOptions) => {
    if (!player.value) {
      player.value = new APlayer({
        ...options,
        storageName: store,
      });
      console.log("register Player ....");
    }
    //加载本地缓存
    const localPlayer = pStore.get();
    localPlayer.audios?.forEach(async (audio) => {
      const url = await songUrl(audio.songId);
      const del = await songDetail(audio.songId);
      const lyc = await lyric(audio.songId);
      audio.name = del.name;
      audio.url = url;
      audio.artist = del.artist;
      audio.cover = del.cover;
      audio.lrc = lyc.lyric;
      addSong(audio);
    });
    player.value.on("listswitch", async (data) => {
      const song = getList()[data.index];
      if (song.cover) {
        const [r, g, b] = await getImageColor(song.cover!);
        const color = `rgb(${r},${g},${b})`;
        player.value?.theme(color, data.index);
        song.theme = color;
      }
      currentRef.value = song;
      playSong();
      setTimeout(() => {
        const localPlayer = pStore.get();
        localStorage.setItem(
          store,
          JSON.stringify({ ...localPlayer, audios: getList() })
        );
      });
    });
  };

  const playSong = () => {
    player.value!.play();
  };
  const pasueSong = () => {
    player.value!.pause();
  };
  const switchSong = (index: number) => {
    player.value?.switchAudio(index);
  };
  const addSong = (audios: Array<Audio> | Audio) => {
    player.value?.addAudio(audios);
  };
  const getList = () => {
    return player.value!.list.audios;
  };

  return {
    registerPlayer,
    pasueSong,
    playSong,
    switchSong,
    addSong,
    getList,
    currentRef,
  };
}
