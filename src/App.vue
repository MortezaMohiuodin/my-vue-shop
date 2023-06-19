<template>
  <div id="app">
    {{ $t("message") }}
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const i18n = useI18n();
console.log(i18n);
// export default {
//   name: "app",
//   mounted() {
//     this.$i18n.locale = "fa";
//   },
// };
</script>
