<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
    :loading="loading"
    min-height="100"
  >
    <v-list-item
      v-for="product in products"
      :key="product.id"
      style="cursor: pointer"
      @click="addToCart(product)"
    >
      <v-list-item-content>
        <v-list-item-title>{{ product.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";

import type { Product } from "@/types";
import { fetchProducts } from "@/services";
import useShopStore from "@/store/useShopStore";

const { addToCart } = useShopStore();
const products = ref<Product[]>([]);
const loading = ref<boolean>(true);

const getProducts = async () => {
  loading.value = true;
  try {
    const data = await fetchProducts();
    products.value = data;
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};
getProducts();
</script>
