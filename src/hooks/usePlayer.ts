import { ref } from "vue";

import APlayer, { APlayerOptions, Audio } from "aplayer";
export default function usePlayer() {
  const player = ref<APlayer>();
  const registerPlayer = (options: APlayerOptions) => {
    if (!player.value) {
      player.value = new APlayer({
        ...options,
      });
      console.log("register Player ....");
    }
  };
  const playSong = () => {
    player.value!.play();
  };
  const pasueSong = () => {
    player.value!.pause();
  };
  const switchSong = (index: number) => {
    player.value!.list.switch(index);
    playSong();
  };
  const addSong = (audios: Array<Audio> | Audio) => {
    player.value!.list.add(audios);
  };
  const getList = () => {
    return player.value!.list.audios;
  };

  return { registerPlayer, pasueSong, playSong, switchSong, addSong, getList };
}
