<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>

    <Dropdown
      v-model="examDuration"
      placeholder="Select Exam Duration"
      option-label="label"
      option-value="value"
      :filter="true"
      :options="timeOptions"
      :class="`w-full input '}`"
      :input-class="'surface-100 flex align-items-center'"
      @change="valueChange"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string;
  label?: string;
  placeHolder?: string;
  required?: boolean;
  submit?: boolean;
  disabled?: boolean;
  value?: string;
}>();

const emits = defineEmits<{
  (e: "onValueChange", value: string | number): void;
}>();

const examDuration = ref(props.value);

const timeOptions = computed(() => {
  const times = [];

  for (let hour = 0; hour <= 2; hour++) {
    for (let minute = 0; minute <= 59; minute++) {
      if (minute === 0 && hour === 0) continue;

      const timeOption = {
        label: hour + "h " + minute + "m",
        value: hour + "h " + minute + "m",
      };

      times.push(timeOption);

      if (hour === 2) break;
    }
  }

  return times;
});

// methods
const valueChange = (event: { value: any }) => {
  emits("onValueChange", event.value);
};

onUpdated(() => {
  if (!examDuration.value && props.value) {
    examDuration.value = props.value;
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

.input {
  height: 40px;

  background: #f8f8f8;
  border-radius: 4px;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
