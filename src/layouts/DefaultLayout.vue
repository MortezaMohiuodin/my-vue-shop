<template>
  <v-layout>
    <v-app-bar app color="primary">
      <v-btn transparent @click.once="handleLogout" class="mr-4">{{
        $t("general.logout")
      }}</v-btn>
      <SelectLanguage white />
      <div class="d-flex align-center white--text font-weight-bold ml-4">
        {{ user.username }}
      </div>
      <v-spacer></v-spacer>
      <span class="white--text font-weight-bold mr-2" v-if="shop.id">{{
        shop.name
      }}</span>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router/composables";

import useAuthStore from "@/store/useAuthStore";
import useShopStore from "@/store/useShopStore";
import SelectLanguage from "@/components/SelectLanguage.vue";

const router = useRouter();

const { user, logout } = useAuthStore();
const { shop } = useShopStore();

const handleLogout = () => {
  logout();
  router.push({ name: "login" });
};
</script>
