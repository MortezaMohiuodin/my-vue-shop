<template>
  <v-sheet
    width="100%"
    class="blue-grey lighten-5 d-flex align-center justify-center"
    height="100vh"
  >
    <v-card class="mx-auto px-3 py-4" rounded width="350">
      <v-form
        @submit.prevent="handleSubmit"
        v-model="isFormValid"
        lazy-validation
      >
        <v-text-field
          v-model="username"
          :rules="[required, counter]"
          :readonly="loading"
          class="mb-2"
          label="Username"
          clearable
        />
        <v-text-field
          v-model="password"
          :rules="[required]"
          :readonly="loading"
          class="mb-2"
          label="Password"
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
          {{ $t("login.submit") }}
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
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "@/modules/axios";
import { useRouter } from "vue-router/composables";
import useAuthStore from "@/store/useAuthStore";
const router = useRouter();
const { setUser } = useAuthStore();

const username = ref("");
const password = ref("");
const loading = ref(false);
const isFormValid = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const handleSubmit = async () => {
  if (!isFormValid.value) return;
  loading.value = true;
  try {
    const { data } = await axios.get(
      `/users?username=${username.value}&password=${password.value}`
    );
    loading.value = false;
    if (data && data.length) {
      const user = data[0];
      setUser({ id: user.id, username: user.username });
      router.push({ name: "store", params: { id: user.id } });
    } else {
      snackbar.value = true;
      snackbarText.value = "No user";
    }
  } catch (e) {
    snackbar.value = true;
    snackbarText.value = e.toString();
    loading.value = false;
  }
};
const required = (v: string) => {
  return !!v || "Field is required";
};
const counter = (v: string) => {
  return v.length < 8 || v.length > 12
    ? "Characters must be between 8 and 12"
    : true;
};
</script>
