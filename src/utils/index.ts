import { User, PlayerStore } from "@/types";
import { Audio } from "aplayer";

import { storeIt, getIt, removeIt } from "./store";

const userStore = {
  key: "user",
  save: (user: User) => {
    storeIt(userStore.key, user);
  },
  get: (): User => getIt(userStore.key),
  clear: () => removeIt(userStore.key),
};

const playerStore = (key: string) => {
  return {
    save: (audios: Audio) => {
      storeIt(key, audios);
    },
    get: (): PlayerStore => getIt(key),
  };
};

export { userStore, playerStore };
