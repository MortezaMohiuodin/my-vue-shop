<template>
  <v-sheet class="d-flex align-center justify-center" min-height="100vh">
    <v-card
      class="mx-auto"
      min-width="400"
      tile
      :loading="loading"
      min-height="100"
    >
      <v-list-item
        v-for="store in stores"
        :key="store.id"
        @click.once="handleClick(store)"
        style="cursor: pointer"
      >
        <v-list-item-content>
          <v-list-item-title>{{ store.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-sheet>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import useShopStore from "@/store/useShopStore";
import useAuthStore from "@/store/useAuthStore";
import axios from "@/modules/axios";
import { useRoute, useRouter } from "vue-router/composables";

const route = useRoute();
const router = useRouter();
const { setShop } = useShopStore();
const { user } = useAuthStore();
const stores = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const id = route.params.id || user.id;
    const { data } = await axios.get(`/stores?userId=${id}`);
    stores.value = data;
    loading.value = false;
  } catch (e) {
    alert(e);
    loading.value = false;
  }
});
const handleClick = (store) => {
  setShop(store);
  router.push({ name: "home" });
};
</script>
