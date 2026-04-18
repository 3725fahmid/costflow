<template>
  <div v-if="renderMultiprices">
    <div class="col-12 flex gap-2 mt-2 p-0 m-0 mb-2">
      <p class="title m-0">Multi Prices</p>

      <Button
        :icon="'pi pi-plus'"
        class="p-button-primary p-1"
        @click="addPrice"
      />
    </div>

    <div
      v-for="(price, index) in multiPrices"
      :key="'package-multiprice-' + price.id"
    >
      <div class="grid">
        <div class="col-10">
          <FormInputPrice
            :value="price"
            @on-value-change="(value) => updatePrice(index, value)"
          />
        </div>

        <div class="flex align-items-center justify-content-center">
          <Button
            :icon="'pi pi-times'"
            class="p-button-danger p-1"
            @click="() => removePrice(index, price.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { Ref } from "vue";
import { Price } from "~~/contracts/api-constracts/common-contracts";
import { PackagePrice } from "~~/contracts/api-constracts/package-contracts";
import PackageService from "~/services/Package.Service";
import { useStore } from "~~/src/stores/store";

// define props
const props = defineProps<{
  initialPrices?: PackagePrice[];
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", values: Price[]): void;
}>();

// initial hooks
const confirm = useConfirm();
const store = useStore();
const toast = useToast();

// define states
const renderMultiprices = ref(true);

const multiPrices: Ref<Price[]> = ref(
  props.initialPrices ? [...props.initialPrices] : []
);

// methods
const updatePrice = (id: number, value: Price) => {
  multiPrices.value[id] = value;

  emits("onValueChange", multiPrices.value);
};

const removePrice = (id: number, priceId: number) => {
  confirm.require({
    message: "Do you want to delete this Price?",
    header: "Delete Confirmation",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-primary",
    accept: async () => {
      if (priceId >= 0) {
        store.loading = true;

        const response = await PackageService.deletePriceById(priceId);

        store.loading = false;

        if (!response.success) {
          toast.add({
            severity: "error",
            summary: "Failed",
            detail: response.message,
            life: 3000,
          });

          return;
        }
      }
      multiPrices.value = multiPrices.value.filter(
        (price, index) => index !== id
      );

      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Package price removed succesully ",
        life: 3000,
      });

      renderMultiprices.value = false;
      await nextTick();
      renderMultiprices.value = true;

      emits("onValueChange", multiPrices.value);
    },
  });
};

const addPrice = () => {
  multiPrices.value.push({
    id: -1,
    price: 10,
    valid_till: "10 day",
    regular_price: 20,
    show_regular_price: true,
  });

  emits("onValueChange", multiPrices.value);
};
</script>

<style scoped>
.title {
  font-family: "Poppins", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #3e3e3e;
}
</style>
