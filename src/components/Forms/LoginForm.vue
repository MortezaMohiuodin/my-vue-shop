<template>
  <v-form @submit.prevent="handleSubmit" v-model="isFormValid" lazy-validation>
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
      data-test="username"
    />
    <v-text-field
      v-model="password"
      :rules="[required(password, $t('general.password'))]"
      :readonly="loading"
      class="mb-2"
      :label="$t('general.password')"
      type="Password"
      clearable
      data-test="password"
    />
    <v-btn
      block
      color="primary"
      :loading="loading"
      :disabled="!isFormValid"
      type="submit"
      data-test="submitBtn"
    >
      {{ $t("general.submit") }}
    </v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, withDefaults } from "vue";

import UserLoginData from "@/types";
import { required, minLength, maxLength } from "@/utils/validations";

interface Props {
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), { loading: false });
const emits = defineEmits<{
  (e: "onSubmit", data: UserLoginData): void;
}>();

const username = ref<string>("");
const password = ref<string>("");
const isFormValid = ref<boolean>(false);

const handleSubmit = () => {
  const user: UserLoginData = {
    username: username.value,
    password: password.value,
  };
  emits("onSubmit", user);
};
</script>
