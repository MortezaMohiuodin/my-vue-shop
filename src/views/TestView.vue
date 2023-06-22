<template>
  <v-container>
    <v-card class="mx-auto mt-4 px-3 py-4" max-width="500">
      <v-form @submit.prevent>
        <v-text-field
          v-model="user.username"
          required
          :label="$t('login.username')"
        />
        <v-text-field
          v-model="user.password"
          required
          :label="$t('login.password')"
          type="password"
        />
        <p class="red--text">{{ error }}</p>
        <v-btn color="primary" @click="handleSubmit" :disabled="!isValid">
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { object, string } from "yup";

const user = ref({
  username: "",
  password: "",
});
const isValid = ref(false);
const error = ref("");
let loginSchema = object({
  username: string()
    .required()
    .min(8, "Username must be at least 8 characters long")
    .max(12, "Username must be less than 12 characters long"),
  password: string()
    .required()
    .min(8, "Password must be at least 8 characters long"),
});

const handleSubmit = async () => {
  try {
    await loginSchema.validate(user.value);
    error.value = null;
  } catch (err) {
    error.value = err.errors[0];
  }
};

watch(
  user.value,
  async () => {
    try {
      await loginSchema.validate(user.value);
      isValid.value = true;
    } catch (err) {
      isValid.value = false;
    }
  },
  {
    immediate: true,
  }
);
</script>
