<template>
  <v-layout>
    <v-main>
      <v-sheet
        width="100%"
        class="blue-grey lighten-5 d-flex align-center justify-center"
        height="100vh"
      >
        <SelectLanguage floating />
        <slot />
      </v-sheet>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import SelectLanguage from "@/components/SelectLanguage.vue";
</script>
