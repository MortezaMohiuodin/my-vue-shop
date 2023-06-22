<template>
  <HomeLayout>
    <template #header>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          {{ user.username }}
        </div>

        <v-spacer></v-spacer>

        <span class="mr-2">{{ shop.name }}</span>
      </v-app-bar>
    </template>
    <template #content>
      <v-row>
        <v-col md="4">
          <v-card
            class="mx-auto"
            min-width="400"
            tile
            :loading="listLoading"
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
        </v-col>
        <v-col md="4">
          <div>{{ $t("home.totalPrice") }} : {{ totalPrice }}</div>
          <v-btn @click.once="handleSendData" :loading="btnLoading">{{
            $t("home.sendData")
          }}</v-btn>
        </v-col>
        <v-col md="4">
          <v-card class="mx-auto" min-width="400" tile min-height="100">
            <v-list-item
              v-for="item in cartList"
              :key="item.id"
              style="cursor: pointer"
            >
              <v-list-item-content>
                <v-list-item-title
                  >{{ item.name }}
                  <v-text-field v-model="item.quntity" />
                  <v-btn @click="removeFromCart(item.id)">Delete</v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </HomeLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "@/modules/axios";
import HomeLayout from "@/layouts/HomeLayout.vue";
import useAuthStore from "@/store/useAuthStore";
import useShopStore from "@/store/useShopStore";
import useShopCart from "@/composables/useShopCart";
const { user } = useAuthStore();
const { shop } = useShopStore();
const { cartList, addToCart, removeFromCart, totalPrice } = useShopCart();

const products = ref([]);
const listLoading = ref(true);
const btnLoading = ref(false);
onMounted(async () => {
  try {
    const { data } = await axios.get(`/products?storeId=${shop.id}`);
    products.value = data;
    listLoading.value = false;
  } catch (e) {
    console.error(e);
    listLoading.value = false;
  }
});
const handleSendData = async () => {
  btnLoading.value = true;
  if (!cartList.value.length) return;
  const invoice = cartList.value.map((item) => {
    return {
      id: item.id,
      name: item.name,
      count: item.quntity,
      totalPrice: item.quntity * item.price,
    };
  });
  try {
    const res = await axios.post("/invoices", invoice);
    console.log(res);
    btnLoading.value = false;
  } catch (e) {
    btnLoading.value = false;
    console.error(e);
  }
};
</script>
