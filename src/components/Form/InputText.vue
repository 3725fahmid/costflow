<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>

    <InputText v-model="textInput" type="text" :class="'w-full input'" :disabled="disabled" :placeholder="placeHolder"
      @input="valueChange" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string;
  label?: string;
  placeHolder?: string;
  value?: string | null;
  required?: boolean;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "onValueChange", value: string | null): void;
}>();

const textInput = ref<string | null>(props.value ?? null);

watch(
  () => props.value,
  (newValue) => {
    textInput.value = newValue ?? null;
  }
);

const valueChange = () => {
  emits("onValueChange", textInput.value ?? null);
};
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
  height: 40px;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>