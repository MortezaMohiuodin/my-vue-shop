<template>
  <v-menu v-model="languageMenu" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :class="[
          'text-capitalize',
          { 'select-language--float': floating, 'white--text': white },
        ]"
        v-bind="attrs"
        v-on="on"
        text
      >
        <v-icon left>mdi-translate</v-icon>
        {{ activeLang }}
        <v-icon small right>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(lang, index) in langs"
        :key="index"
        @click="handleClick(lang.value)"
      >
        <v-list-item-title>{{ lang.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { ref, computed, defineProps, withDefaults } from "vue";
import { useI18n } from "vue-i18n-composable";

import type { Lang } from "@/types";

interface Props {
  floating: boolean;
  white: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  floating: false,
  white: false,
});
const { locale } = useI18n();
const languageMenu = ref<boolean>(false);
const langs: Lang[] = [
  { title: "English", value: "en" },
  { title: "فارسی", value: "fa" },
];
const handleClick = (value: string) => {
  locale.value = value;
};
const activeLang = computed(() => {
  const lang = langs.find((lang) => lang.value === locale.value);
  if (!lang) return "English";
  return lang.title;
});
</script>
