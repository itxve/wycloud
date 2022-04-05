import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith("meting-js");
};

app.mount("#app");
