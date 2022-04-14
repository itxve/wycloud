import { ref } from "vue";
import APlayer, { APlayerOptions, Audio } from "aplayer";
import useImageColor from "@/hooks/useImageColor";
import { songUrl, songDetail, lyric } from "@/apis";
import { playerStore } from "@/utils";

export default function usePlayer(store = "my-aplayer") {
  const pStore = playerStore(store);

  console.log("storeKey", store);
  const { getImageColor } = useImageColor();
  const player = ref<APlayer>();
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
    localPlayer.audios?.forEach((audio) => addSong(audio));

    player.value.on("listswitch", async (data) => {
      const song = getList()[data.index];
      //加载歌曲信息
      //播放的url是临时的 (APlayer的歌词第一次就被决定了)
      const url = await songUrl(song.songId);
      const del = await songDetail(song.songId);
      const lyc = await lyric(song.songId);
      song.name = del.name;
      song.url = url;
      song.artist = del.artist;
      song.cover = del.cover;
      song.lrc = lyc.lyric;
      const [r, g, b] = await getImageColor(song.cover!);
      const color = `rgb(${r},${g},${b})`;
      player.value?.theme(color, data.index);
      song.theme = color;
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
    player.value!.list.switch(index);
  };
  const addSong = (audios: Array<Audio> | Audio) => {
    player.value!.list.add(audios);
  };
  const getList = () => {
    return player.value!.list.audios;
  };

  return { registerPlayer, pasueSong, playSong, switchSong, addSong, getList };
}
