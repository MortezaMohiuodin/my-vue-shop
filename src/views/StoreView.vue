<template>
  <v-container>
    <v-card
      class="mx-auto mt-6"
      max-width="400"
      tile
      :loading="loading"
      min-height="100"
    >
      <v-list-item
        v-for="store in stores"
        :key="store.id"
        @click="handleClick(store)"
        style="cursor: pointer"
      >
        <v-list-item-content>
          <v-list-item-title>{{ store.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router/composables";

import useShopStore from "@/store/useShopStore";
import useAuthStore from "@/store/useAuthStore";
import { fetchStores } from "@/services";
import type { Store } from "@/types";

const router = useRouter();

const { setShop } = useShopStore();
const { user } = useAuthStore();

const stores = ref<Store[]>([]);
const loading = ref(false);

const getStores = async () => {
  const id = user.id;
  loading.value = true;

  try {
    loading.value = false;
    const data = await fetchStores(id);
    stores.value = data;
  } catch (e) {
    alert(e);
    loading.value = false;
  }
};

const handleClick = (store: Store) => {
  setShop(store);
  router.push({ name: "home" });
};

getStores();
</script>
