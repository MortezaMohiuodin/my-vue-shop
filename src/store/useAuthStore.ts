import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types";
import localSetting from "@/plugins/localSetting";
const useAuthStore = defineStore("auth", () => {
  const user = ref<User>({
    id: null,
    username: "",
  });
  const setUser = ({ id, username }: User) => {
    user.value.id = id;
    user.value.username = username;
    localSetting.set("userInfo", { id, username });
  };
  const getUser = () => {
    const localUser: User = localSetting.get("userInfo");
    if (!localUser || !localUser.id || !localUser.username) return null;
    user.value.id = localUser.id;
    user.value.username = localUser.username;
    return user.value;
  };
  const isLogin = computed(() => {
    return !!user.value.username;
  });
  const logout = () => {
    localSetting.clear("userInfo");
    user.value = {
      id: null,
      username: "",
    };
  };
  return { user, setUser, getUser, isLogin, logout };
});
export default useAuthStore;
