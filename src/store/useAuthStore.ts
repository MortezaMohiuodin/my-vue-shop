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
    const userJson = JSON.stringify(user.value);
    localStorage.setItem(`${process.env.VUE_APP_NAME}_user`, userJson);
  };
  const getUser = () => {
    const localUserJson = localStorage.getItem(
      `${process.env.VUE_APP_NAME}_user`
    );
    if (!localUserJson) return null;
    const localUser = JSON.parse(localUserJson);
    user.value = localUser;
    return user.value;
  };
  const isLogin = () => {
    const user = getUser();
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem(`${process.env.VUE_APP_NAME}_user`);
    user.value = {
      id: null,
      username: "",
    };
  };
  return { user, setUser, getUser, isLogin, logout };
});
export default useAuthStore;
