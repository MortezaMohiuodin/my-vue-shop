<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router/composables";

const route = useRoute();
const layout = computed(() => {
  const layout = route?.meta?.layout;
  return layout ? `${layout}Layout` : "div";
});
</script>
