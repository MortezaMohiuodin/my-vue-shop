<template>
  <v-container class="mt-6">
    <v-row>
      <v-col md="4">
        <product-list />
      </v-col>
      <v-col md="4" class="text-center">
        <invoice-summary />
      </v-col>
      <v-col md="4">
        <selected-products />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import ProductList from "@/components/Shop/ShopProductList.vue";
import InvoiceSummary from "@/components/Shop/ShopInvoiceSummary.vue";
import SelectedProducts from "@/components/Shop/ShopSelectedProducts.vue";
</script>
