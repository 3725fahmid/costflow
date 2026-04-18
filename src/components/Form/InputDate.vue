<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>

    <Calendar
      v-model="dateInput"
      type="text"
      autocomplete="off"
      hour-format="12"
      :show-icon="true"
      :show-time="showTime"
      :time-only="timeOnly"
      :current-second="0"
      :disabled="disabled"
      :placeholder="placeHolder"
      :date-format="'mm/dd/yy'"
      :class="'w-full input'"
      :input-class="'surface-100'"
      :min-date="minDate"
      :max-date="maxDate"
      @date-select="valueChange"
    />
  </div>
</template>

<script setup lang="ts">
import { convertDateToString } from "~~/src/helpers/utils";

// define props
const props = defineProps<{
  name?: string;
  label?: string;
  placeHolder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | Date | number | null;
  showTime?: boolean;
  timeOnly?: boolean;
  minDate?: Date | null;
  maxDate?: Date;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", value: string | number): void;
}>();

// define staps
const dateInput = ref(props.value);
const minDate = ref(props.minDate);

// methods
const valueChange = () => {
  if (typeof dateInput.value === "string") {
    dateInput.value = new Date(dateInput.value);
  }

  const dateTime = convertDateToString(dateInput.value);

  emits("onValueChange", dateTime);
};

onMounted(() => {
  minDate.value = props.minDate;
});

onUpdated(() => {
  minDate.value = props.minDate;

  if (props.value && !dateInput.value) {
    dateInput.value = new Date(props.value);

    valueChange();
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

  background-color: #f8f8f8;
  border-radius: 4px;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
