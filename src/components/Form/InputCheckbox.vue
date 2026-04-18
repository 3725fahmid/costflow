<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>
    <div class="flex align-items-center form-check">
      <Checkbox v-model="checked" :binary="true" @change="valueChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
// define props
const props = defineProps<{
  name?: string;
  label?: string;
  value?: boolean;
  required?: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", value: boolean): void;
}>();

const checked = ref(props.value);

const valueChange = () => {
  emits("onValueChange", checked.value);
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
.form-check {
  height: 40px;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
