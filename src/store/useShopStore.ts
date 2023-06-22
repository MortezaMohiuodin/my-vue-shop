import { ref } from "vue";
import { defineStore } from "pinia";
type Store = {
  id: number | null;
  name: string;
};
const useShopStore = defineStore("shop", () => {
  const shop = ref<Store>({
    id: null,
    name: "",
  });
  const setShop = ({ id, name }: Store) => {
    shop.value.id = id;
    shop.value.name = name;
  };
  return { shop, setShop };
});

export default useShopStore;
