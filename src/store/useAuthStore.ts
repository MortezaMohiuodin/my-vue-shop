import { ref } from "vue";
import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", () => {
  const user = ref({
    id: "1",
    name: "morteza",
  });
  return { user };
});
export default useAuthStore;
