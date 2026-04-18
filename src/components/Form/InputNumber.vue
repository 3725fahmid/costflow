<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>

    <input
      v-model="numberInput"
      type="number"
      :min="minNumber"
      :max="maxNumber"
      :class="['w-full input']"
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
  value?: string | number | null;
  required?: boolean;
  submit?: boolean;
  maxNumber?: number;
  minNumber?: number;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", value: string | number): void;
}>();

// define staps
const numberInput = ref();

// methods
const valueChange = () => {
  emits("onValueChange", numberInput.value);
};

onMounted(() => {
  if (props.value) numberInput.value = props.value;
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
  height: 40px;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #ced4da;
  padding: 0.5rem 0.5rem;
}

.input:focus {
  outline: 1px solid #f58400;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
