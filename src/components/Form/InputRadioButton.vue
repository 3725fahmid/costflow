<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>
    <div class="flex align-items-center gap-2">
      <label
        v-for="option in options"
        :key="'option-' + option.value"
        :for="option.value.toString()"
        class="radio-card w-full"
      >
        <RadioButton
          v-model="checked"
          :input-id="option.value.toString()"
          :value="option.value"
          @change="valueChange"
        />
        <div class="label-title">
          {{ option.label }}
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string | number | boolean;
}

// define props
const props = defineProps<{
  label?: string;
  required?: boolean;
  options: Option[];
  value?: string | number | boolean;
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: string | number | boolean): void;
}>();

// define states
const checked = ref(props.value);

// methods
const valueChange = () => {
  if (checked.value) emits("onValueChange", checked.value);
};

// lifecycle hooks
onUpdated(() => {
  if (!checked.value && props.value) {
    checked.value = props.value;
    emits("onValueChange", checked.value);
  }
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

.radio-card:hover {
  border: 1px solid var(--primary-color);
}
.radio-card {
  box-sizing: border-box;
  padding: 9px;
  background-color: #f8f8f8;
  border-radius: 4px;
  display: flex;
  border: 1px solid #e0e5e9;
}

.label-title {
  margin-left: 10px;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
