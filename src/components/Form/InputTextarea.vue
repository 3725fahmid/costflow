<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>

    <Textarea
      v-model="textInput"
      :rows="rows"
      :cols="cols"
      :disabled="disabled"
      :class="'w-full input'"
      type="text"
      @keyup="valueChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
// define props
const props = defineProps<{
  name?: string;
  label?: string;
  value?: string | null;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  cols?: number;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", value: string): void;
}>();

// define staps
const textInput: Ref<string | undefined> = ref(props.value);

// methods
const valueChange = () => {
  emits("onValueChange", textInput.value);
};

onUpdated(() => {
  if (props.value && !textInput.value) {
    textInput.value = props.value;
  }
});
</script>

<style scoped>
.label {
  font-family: "Poppins", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.input {
  background: #f8f8f8;
  border-radius: 4px;
}
</style>
