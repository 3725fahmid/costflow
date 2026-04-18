<template>
  <div class="container">
    <h5 class="label label-sm md:label-md">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>

    <div>
      <div
        v-for="option in options"
        :key="option.value"
        :class="`option ${option.value === inputValue ? 'active' : ''}`"
        @click="valueChange(option.value)"
      >
        <Checkbox
          v-model="inputValue"
          class="mt-1"
          :true-value="option.value"
          :binary="true"
        />
        <div class="pl-2">
          <h5 class="option-title">{{ option.title }}</h5>
          <h5 class="option-subtitle">{{ option.subTitle }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
type optionI = {
  title: string;
  subTitle: string;
  value: string;
};

// define props
const props = defineProps<{
  name?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  options: optionI[];
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: string | number): void;
}>();

// define states
const inputValue: Ref<string | number | null | undefined> = ref(props.value);

// methods
const valueChange = (value: string | number) => {
  if (inputValue.value === value) {
    inputValue.value = null;
  } else {
    inputValue.value = value;
    emits("onValueChange", inputValue.value);
  }
};

onUpdated(() => {
  if (!inputValue.value && props.value) {
    inputValue.value = props.value;
  }
});
</script>

<style scoped>
.container {
  padding: 16px;

  background: #f8f8f8;
  border-radius: 4px;
}

.label {
  /* min-height: 27px; */

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  /* line-height: 27px; */

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.label-sm {
  font-size: 16px;
}

.label-md {
  font-size: 18px;
}

.option {
  box-sizing: border-box;

  min-height: 64px;
  padding: 12px 6px;
  margin-top: 12px;

  background: #ffffff;
  opacity: 0.8;
  border-radius: 4px;

  display: flex;
  /* align-items: center; */

  border: 1px solid #ffffff;
  border-radius: 4px;
}

.option:hover {
  border: 1px solid #ff9100;
  border-radius: 4px;
}

.option-title {
  /* min-height: 27px; */

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  /* line-height: 27px; */

  display: flex;
  align-items: center;

  color: #aaaaaa;
}

.option-subtitle {
  min-height: 21px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  display: flex;
  align-items: center;

  color: #aaaaaa;
}

.option:hover .option-title {
  /* min-height: 27px; */

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  /* line-height: 27px; */

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.option:hover .option-subtitle {
  min-height: 21px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  display: flex;
  align-items: center;

  color: #686868;
}

.active {
  box-sizing: border-box;

  min-height: 64px;
  margin-top: 12px;

  background: #ffffff;
  opacity: 0.8;
  border-radius: 4px;

  display: flex;

  border: 1px solid #ff9100;
  border-radius: 4px;
}

.active .option-title {
  /* min-height: 27px; */

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  /* line-height: 27px; */

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.active .option-subtitle {
  /* min-height: 21px; */

  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  /* line-height: 21px; */

  display: flex;
  align-items: center;

  color: #686868;
}

@media only screen and (max-width: 1350px) {
  .label {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
