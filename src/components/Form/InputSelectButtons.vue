<template>
  <div class="w-full">
    <h5 v-if="label" class="label">
      <span v-if="required" class="text-red-600">*</span> {{ label }}
    </h5>

    <div class="w-full options flex justify-content-between p-2">
      <div
        v-for="option in options"
        :key="name + '-' + option.value"
        :class="[
          'flex align-items-center justify-content-center px-1 mr-1  w-full h-full cursor-pointer',
          { 'bg-white border-round-lg': selectedOptionValue === option.value },
        ]"
        @click="() => handleOptionClick(option.value)"
      >
        <div class="flex align-items-center justify-content-center">
          <h5
            class="option-title flex align-items-center justify-content-center m-0"
          >
            {{ option.label }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type option = {
  label: string;
  value: string | number | boolean;
};

// define props
const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  options: option[] | undefined;
  modelValue: number | string | boolean;
  loading?: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();

// declare states
const selectedOptionValue = ref(props.modelValue);

// methods
const handleOptionClick = (value: string | number | boolean) => {
  selectedOptionValue.value = value;

  emits("update:modelValue", value);
};

onUpdated(() => {
  if (!selectedOptionValue.value && props.modelValue) {
    selectedOptionValue.value = props.modelValue;
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

.option-title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  color: #3e3e3e;
}

.options {
  height: 40px;
  background: #f8f8f8;

  //   border: 1px solid #f8f8f8;
  border: 1px solid #ced4da;
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
