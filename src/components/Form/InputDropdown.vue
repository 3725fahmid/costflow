<template>
  <div class="w-full">
    <h5 v-if="label" class="label">
      <span v-if="required" class="text-red-600">*</span> {{ label }}
    </h5>

    <Dropdown
      v-model="dropDownValue"
      option-label="label"
      option-value="value"
      filter-placeholder="Search..."
      clear-icon="pi pi-times"
      :options="options"
      :disabled="disabled"
      :placeholder="placeholder"
      :filter="true"
      :class="`dropdown w-full`"
      :loading="loading"
      :reset-filter-on-hide="true"
      @change="valueChange"
    />
  </div>
</template>

<script setup lang="ts">
import { DropdownOption } from "~~/contracts/common";

// define props
const props = defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options: DropdownOption[] | undefined;
  value?: number | string;
  loading?: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", value: string | number): void;
}>();

// declare states
const dropDownValue = ref(props.value);

// methods
const valueChange = () => {
  emits("onValueChange", dropDownValue.value);
};

onUpdated(() => {
  if (!dropDownValue.value && props.value) {
    dropDownValue.value = props.value;
  }
});
</script>

<style lang="scss" scoped>
.label {
  font-family: "Poppins", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.dropdown {
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;

  align-items: center;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
