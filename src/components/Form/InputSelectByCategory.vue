<template>
  <div class="input-container">
    <div class="scroll-field" :style="{ maxHeight: maxHeight + 'px' }">
      <fieldset
        v-for="option in options"
        :key="'option-' + option.value"
        :legend="option.title"
        class="w-full category-card"
      >
        <legend>{{ option.title }}</legend>

        <div class="w-full flex flex-wrap gap-2">
          <label
            v-for="inputOption in option.options"
            :key="'option-' + inputOption.value"
            :for="'input-option' + inputOption.value.toString()"
            :class="[
              'option-card cursor-pointer',
              {
                'active-option':
                  selectedOptions[option.value] === inputOption.value,
              },
            ]"
            @click="() => handleChange(option.value, inputOption.value)"
          >
            <div class="label-title">
              <span class="label">
                {{ inputOption.title }}
              </span>

              <div class="text-xs">
                {{ inputOption.subtitle }}
              </div>
            </div>
          </label>

          <div v-if="!option.options.length" :class="['no-option-card ']">
            <div class="label-title flex align-items-center p-2">
              No Modeltest Found
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModeltestOptionsInterface } from "~~/contracts/common";
import { ModelTestContract } from "~~/contracts/api-constracts/modeltest-contract";

// define props
const props = defineProps<{
  options: ModeltestOptionsInterface[];
  values: ModelTestContract[];
  maxHeight: Number;
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: any): void;
}>();

const selectedOptions = ref([]);

// methods
const handleChange = (category, subcategory) => {
  selectedOptions.value[category] = subcategory;
  emits("onValueChange", selectedOptions.value);
};

onMounted(() => {
  if (props.values) {
    const existingModeltests = new Map();
    props.values.forEach((modelTest) => {
      modelTest.schedules.forEach((schedule: string) => {
        const initialDate = new Date(schedule.start_at);
        const modifiedDate = new Date(
          initialDate.getTime() + 6 * 60 * 60 * 1000
        );
        const startAt = modifiedDate.toISOString().split("T")[0];

        existingModeltests.set(startAt, modelTest.id);
      });
    });
    existingModeltests.forEach((value, key) => {
      selectedOptions.value[key] = value;
    });
  }
});
</script>

<style scoped>
.label {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}
.input-container {
  border: 1px solid #ebe9e9;
  border-radius: 12px;
  box-shadow: 1px;
  padding: 10px;
}

.category-card {
  box-sizing: border-box;
  padding: 4px;
  background-color: #f8f8f8;
  border-radius: 4px;
  display: flex;
  border: 1px solid #e0e5e9;

  margin-top: 5px;
}

.option-card {
  box-sizing: border-box;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  border: 1px solid #e0e5e9;
}

.option-card:hover {
  border: 1px solid var(--primary-color);
}

.no-option-card {
  box-sizing: border-box;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  border: 1px solid #e0e5e9;
}

.active-option {
  border: 1px solid var(--primary-color);
}

.scroll-field {
  padding-right: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.scroll-field::-webkit-scrollbar {
  width: 5px;
}

.scroll-field::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #f0f0f5;
  border: 1px solid #f0f0f5;
}

.scroll-field::-webkit-scrollbar-thumb {
  border-radius: 4px;
  /* background-color: #e7dede; */

  background-color: #e4e4ec;
}
</style>
