<template>
  <v-card
    class="mx-auto"
    min-width="400"
    tile
    min-height="100"
    v-if="shopStore.cartList.length"
  >
    <v-list-item v-for="item in shopStore.cartList" :key="item.id">
      <v-list-item-content>
        <v-list-item-title>
          {{ $t("general.productName") }}
          {{ item.name }}
          {{ $t("general.totalPrice") }}
          {{ (item.quntity * item.price) | price }}
          <v-text-field v-model="item.quntity" type="number" />
          <v-btn @click="shopStore.removeFromCart(item.id)">{{
            $t("general.delete")
          }}</v-btn>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script setup lang="ts">
import useShopStore from "@/store/useShopStore";

const shopStore = useShopStore();
</script>
