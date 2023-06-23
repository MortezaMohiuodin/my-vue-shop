<template>
  <v-container>
    <v-card class="mx-auto px-3 py-4" rounded width="350">
      <v-form
        @submit.prevent="handleSubmit"
        v-model="isFormValid"
        lazy-validation
      >
        <v-text-field
          v-model="username"
          :rules="[
            required(username, $t('general.username')),
            minLength(username, 8, $t('general.username')),
            maxLength(username, 12, $t('general.username')),
          ]"
          :readonly="loading"
          class="mb-2"
          :label="$t('general.username')"
          clearable
        />
        <v-text-field
          v-model="password"
          :rules="[required(password, $t('general.password'))]"
          :readonly="loading"
          class="mb-2"
          :label="$t('general.password')"
          type="Password"
          clearable
        />
        <v-btn
          block
          color="primary"
          :loading="loading"
          :disabled="!isFormValid"
          type="submit"
        >
          {{ $t("general.submit") }}
        </v-btn>
      </v-form>
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

import { loginUser } from "@/services";
import useAuthStore from "@/store/useAuthStore";
import { required, minLength, maxLength } from "@/utils/validations";

const router = useRouter();
const { t } = useI18n();
const { setUser } = useAuthStore();

const username = ref<string>("");
const password = ref<string>("");
const loading = ref<boolean>(false);
const isFormValid = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string | LocaleMessage>("");

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  loading.value = true;
  const payload = {
    username: username.value,
    password: password.value,
  };
  try {
    const data = await loginUser(payload);
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
