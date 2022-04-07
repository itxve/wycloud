import { ref } from "vue";

import APlayer, { APlayerOptions, Audio } from "aplayer";
import useImageColor from "@/hooks/useImageColor";

export default function usePlayer() {
  const { getImageColor } = useImageColor();
  const player = ref<APlayer>();
  const registerPlayer = (options: APlayerOptions) => {
    if (!player.value) {
      player.value = new APlayer({
        ...options,
      });
      console.log("register Player ....");
    }
    player.value.on("listswitch", async (data) => {
      const song = getList()[data.index];
      const [r, g, b] = await getImageColor(song.cover!);
      const color = `rgb(${r},${g},${b})`;
      player.value?.theme(color, data.index);
      song.theme = color;
      playSong();
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
