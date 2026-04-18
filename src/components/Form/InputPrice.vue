<template>
  <div v-if="renderPrices" class="grid">
    <div class="col-3 md:col-3">
      <FormInputNumber
        :min-number="0"
        :label="'Validity (Number)'"
        :required="true"
        :value="price?.valid_till_date"
        @on-value-change="(value) => valueChange('valid_till_date', value)"
      />
    </div>

    <div class="col-3 md:col-3">
      <FormInputDropdown
        :label="'Validity (Time)'"
        :name="'Validity (Time)' + price?.id"
        :options="ValidityTime"
        :value="price?.valid_tail_time"
        :required="true"
        @on-value-change="(value) => valueChange('valid_tail_time', value)"
      />
    </div>
    <div class="col-3 md:col-2">
      <h5 class="label"><span class="text-red-600">*</span>Regular Price</h5>

      <InputNumber
        v-model="price.regular_price"
        mode="decimal"
        :min="price.price"
        :show-buttons="true"
        class="input"
        input-class="w-full h-full "
        @input="(input) => valueChange('regular_price', input.value)"
      />
    </div>
    <div class="col-2 md:col-2">
      <h5 class="label"><span class="text-red-600">*</span>Price</h5>

      <InputNumber
        v-model="price.price"
        mode="decimal"
        :min="10"
        :max="price.regular_price"
        :show-buttons="true"
        class="input"
        input-class="w-full h-full "
        @input="(input) => valueChange('price', input.value)"
      />
    </div>

    <div class="col-1 md:col-2">
      <FormInputCheckbox
        :name="'show-price-' + price?.id"
        :label="'Show Regular Price'"
        :value="price?.show_regular_price"
        :required="true"
        @on-value-change="(value) => valueChange('show_regular_price', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Price } from "~~/contracts/api-constracts/common-contracts";
import { ValidityTime } from "~~/constants/form-options";

// define props
const props = defineProps<{
  value: Price;
}>();

const emits = defineEmits<{
  (e: "onValueChange", value: Price): void;
}>();

// define states
const price = ref({
  id: props.value.id,
  price: props.value.price,
  regular_price: props.value.regular_price,
  show_regular_price: props.value.show_regular_price,
  valid_till_date: props.value.valid_till?.split(" ")[0],
  valid_tail_time: props.value.valid_till?.split(" ")[1],
});
const renderPrices = ref(true);

const valueChange = async (field: string, value: any) => {
  price.value[field] = value;

  const updatedPrice = {
    id: price.value.id,
    price: price.value.price,
    regular_price: price.value.regular_price,
    show_regular_price: price.value.show_regular_price,
    valid_till: price.value.valid_till_date + " " + price.value.valid_tail_time,
  };

  emits("onValueChange", updatedPrice);
};
</script>

<style scoped>
.label {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.input {
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #ced4da;
  /* padding: 0.5rem 0.5rem; */
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
