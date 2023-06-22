import { ref } from "vue";
import { defineStore } from "pinia";
type User = {
  id: number | null;
  username: string;
};
const useAuthStore = defineStore("auth", () => {
  const user = ref<User>({
    id: null,
    username: "",
  });
  const setUser = ({ id, username }: User) => {
    user.value.id = id;
    user.value.username = username;
  };
  return { user, setUser };
});
export default useAuthStore;
