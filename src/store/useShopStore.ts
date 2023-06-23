import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { CartItem, Store, Product } from "@/types";

const useShopStore = defineStore("shop", () => {
  const shop = ref<Store>({
    id: null,
    name: "",
  });
  const setShop = ({ id, name }: Store) => {
    shop.value.id = id;
    shop.value.name = name;
  };

  const cartList = ref<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const itemIndex = cartList.value.findIndex(
      (element) => element.id === product.id
    );
    if (itemIndex > -1) {
      cartList.value[itemIndex].quntity++;
    } else {
      cartList.value.push({ ...product, quntity: 1 });
    }
  };
  const removeFromCart = (id: number) => {
    cartList.value = cartList.value.filter((element) => element.id !== id);
  };
  const cartTotalPrice = computed(() => {
    return cartList.value.reduce(
      (acc, current) => (acc = acc + current.price * current.quntity),
      0
    );
  });
  const cartReset = () => {
    cartList.value = [];
  };
  return {
    shop,
    setShop,
    cartList,
    addToCart,
    removeFromCart,
    cartTotalPrice,
    cartReset,
  };
});

export default useShopStore;
