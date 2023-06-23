<template>
  <v-container>
    <v-card class="mx-auto px-3 py-4" rounded width="350">
      <login-form :loading="loading" @onSubmit="handleSubmit" />
    </v-card>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      top
      rounded
      min-height="50"
      color="#FF5252"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router/composables";
import { useI18n } from "vue-i18n-composable";
import { LocaleMessage } from "vue-i18n";

import LoginForm from "@/components/Forms/LoginForm.vue";
import { loginUser } from "@/services";
import useAuthStore from "@/store/useAuthStore";
import { UserLoginData } from "@/types";

const router = useRouter();
const { t } = useI18n();
const { setUser } = useAuthStore();

const loading = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string | LocaleMessage>("");

const handleSubmit = async (userData: UserLoginData) => {
  loading.value = true;
  try {
    const data = await loginUser(userData);
    loading.value = false;
    setUser({ id: data.id, username: data.username });
    router.push({ name: "store" });
  } catch (error) {
    snackbar.value = true;
    snackbarText.value = error?.errorType
      ? t(`reqErrors.${error.errorType}`)
      : t(`reqErrors.server`);
    loading.value = false;
  }
};
</script>
