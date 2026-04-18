<template>
  <div>
    <div class="w-full">
      <h5 class="label">
        <span v-if="required" class="text-red-600">*</span> {{ label }}
      </h5>

      <div v-if="options">
        <div class="w-full p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            :disabled="disabled"
            class="w-full search-input"
            placeholder="Search..."
          />
        </div>

        <div v-if="loading" class="option-container overflow-y-scroll mt-1">
          <div
            v-for="n in 5"
            :key="n"
            class="flex justify-content-between pr-2"
          >
            <h3
              class="p-0 m-0 ml-2 flex align-items-center justify-content-start"
            >
              <Skeleton :class="'mb-2 w-' + getRandomInt(20, 30) + 'rem'" />
            </h3>
            <h5
              class="meta-data ml-2 flex align-items-center justify-content-start"
            >
              <Skeleton :class="'mb-2 w-6rem'" />
            </h5>
          </div>
        </div>

        <div
          v-else-if="inputOptions?.length"
          class="option-container overflow-y-scroll mt-1"
        >
          <label
            v-for="(option, index) of inputOptions"
            :key="option.value"
            :for="option.value.toString()"
            class="checkbox-field hover:text-blue-600 flex align-items-center justify-content-between"
          >
            <div>
              <span class="mr-2">{{ index + 1 }}.</span>
              <span>{{ option.label }}</span>
            </div>
            <div>
              <span class="mr-2 md:mr-5 font-light text-color-secondary">
                {{ option.count }}
              </span>
              <Checkbox
                v-model="selectedOptions"
                :input-class="'checkbox-icon'"
                :input-id="option.value.toString()"
                :value="option.value"
                :disabled="disabled"
                @click.prevent
                @change="valueChange"
              />
            </div>
          </label>
        </div>

        <div
          v-else
          class="option-container flex flex-column align-items-center justify-content-center"
        >
          <img
            v-if="!disabled"
            width="200"
            :src="'/images/icons/no-result.png'"
            alt=""
            srcset=""
          />
          <div v-if="!disabled">No {{ name }} Found.</div>
        </div>
      </div>

      <div v-else>
        <div class="w-full p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            disabled
            class="w-full search-input"
            placeholder="Search..."
          />
        </div>

        <div class="option-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomInt } from "~~/src/helpers/utils";

type option = {
  label: string;
  count: string | number;
  value: string | number;
};

// define props
const props = defineProps<{
  name?: string;
  label?: string;
  required?: boolean;
  options: option[] | null;
  values?: number[] | string[];
  disabled?: boolean;
  loading?: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", values: string[] | number[]): void;
}>();

// define states
const searchQuery = ref("");
const selectedOptions = ref();

// computed properties
const inputOptions = computed(() => {
  return props?.options?.filter((option: { label: string | string[] }) => {
    return option.label.includes(searchQuery.value);
  });
});

// methods
const valueChange = () => {
  emits("onValueChange", selectedOptions.value);
};

onUpdated(() => {
  if (props.values && !selectedOptions.value) {
    selectedOptions.value = props.values;
  }
});
</script>

<style lang="scss" scoped>
.label {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}
.option-container {
  height: 300px;
}

.option-container::-webkit-scrollbar {
  width: 7px;
}

.option-container::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.option-container::-webkit-scrollbar-thumb {
  background-color: #d6d6d6;
  border-radius: 20px;
  border: 0px;
}

.search-input {
  height: 40px;
}

.checkbox-field {
  background: #fdfdfd;
  padding: 25px;
  padding-left: 8px;
  border-bottom: 2px solid #f5f5f5;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.checkbox-icon {
  border: 1px;
}

.checkbox-skeleton {
  padding: 25px;
  border-bottom: 2px solid #f5f5f5;
  margin: 3px 0px;
}
</style>
