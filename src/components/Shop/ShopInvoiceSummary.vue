<template>
  <div>
    <div class="mb-4">
      {{ $t("general.totalPrice") }} : {{ cartTotalPrice | price }}
    </div>
    <v-btn @click="handleSubmit" :loading="loading" :disabled="loading">{{
      $t("general.sendData")
    }}</v-btn>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      top
      rounded
      min-height="50"
      color="success"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n-composable";
import { LocaleMessage } from "vue-i18n";

import useShopStore from "@/store/useShopStore";
import { sendInvoice } from "@/services";
import localSetting from "@/plugins/localSetting";
import type { Invoice, InvoiceItem } from "@/types";

const shopStore = useShopStore();
const { cartList, cartTotalPrice } = storeToRefs(shopStore);
const { t } = useI18n();

const loading = ref(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string | LocaleMessage>("");

const handleSubmit = async () => {
  loading.value = true;
  if (!cartList.value.length) return;
  const items: InvoiceItem[] = cartList.value.map((item) => {
    return {
      id: item.id,
      name: item.name,
      count: item.quntity,
      totalPrice: item.quntity * item.price,
    };
  });
  const payload: Invoice = {
    items,
    totalPrice: cartTotalPrice.value,
  };
  try {
    const data = await sendInvoice(payload);
    localSetting.set("shopInfo", data);
    shopStore.cartReset();
    loading.value = false;
    snackbar.value = true;
    snackbarText.value = t("messages.successPurchase");
  } catch (e) {
    loading.value = false;
    console.error(e);
  }
};
</script>
