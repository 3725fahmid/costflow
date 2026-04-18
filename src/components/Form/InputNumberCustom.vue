<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>
      {{ label }}
    </h5>

    <input
      v-model="numberInput"
      type="number"
      :min="minNumber"
      :max="maxNumber"
      :disabled="disabled"
      :class="['w-full input', { disable: disabled }]"
      :placeholder="placeholder"
      @keyup="valueChange"
    />
  </div>
</template>

<script setup lang="ts">
// define props
const props = defineProps<{
  name?: string;
  label?: string;
  placeholder?: string;
  value?: number | null;
  required?: boolean;
  disabled?: boolean;
  submit?: boolean;
  maxNumber?: number;
  minNumber?: number;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", value: number): void;
}>();

// define staps
const numberInput = ref();

// methods
const valueChange = () => {
  emits("onValueChange", numberInput.value);
};

onMounted(() => {
  if (props.value >= 0) numberInput.value = props.value;
});
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
  color: black;
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #ced4da;
  padding: 0.5rem 0.5rem;
}

.input:focus {
  border: none;
  outline: 1px solid #f58400;
}

.disable {
  pointer-events: none;
  color: #bdbaba;
}
@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
