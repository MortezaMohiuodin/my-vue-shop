import { ref, computed } from "vue";
type Product = {
  id: number | null;
  name: string;
  price: number;
  quntity: number;
};
export default function useShopCart() {
  const cartList = ref<Product[]>([]);
  const totalPrice = computed(() => {
    return cartList.value.reduce(
      (acc, current) => (acc = acc + current.price * current.quntity),
      0
    );
  });
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
  return { cartList, addToCart, removeFromCart, totalPrice };
}
