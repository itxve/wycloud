import { ref, watchEffect } from "vue";
const appLoading = ref(0);
export default function useAppProgress() {
  const addLoading = () => {
    appLoading.value++;
  };
  const endLoading = () => {
    if (appLoading.value > 0) {
      setTimeout(() => appLoading.value--, 1000);
    }
  };

  watchEffect(() => {
    console.log("appLoading", appLoading.value);
  });
  return { addLoading, endLoading, loading: appLoading };
}
