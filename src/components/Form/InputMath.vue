<template>
  <div>
    <math-field
      ref="mathfield"
      class="mathfield h-full w-full"
      virtual-keyboard-mode="onfocus"
      virtual-keyboard-layout="dvorak"
      virtual-keyboard-container="keyboardContainer"
      :config="{ smartFence: false }"
      :aria-disabled="disabled"
      @input="(event) => emits('update:modelValue', event.target.value)"
    >
      {{ modelValue }}
    </math-field>
  </div>
</template>

<script setup lang="ts">
// define props
const props = defineProps<{
  modelValue: string | null;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// define states
const mathfield = ref("");

watch(
  () => props.modelValue,
  () => {
    mathfield.value.value = props.modelValue;
  }
);
</script>
