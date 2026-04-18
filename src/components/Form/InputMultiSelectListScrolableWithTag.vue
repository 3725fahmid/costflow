<template>
  <div>
    <div v-if="showForm" class="w-full">
      <h5 class="label">
        <span v-if="required" class="text-red-600">*</span> {{ label }}
      </h5>

      <div v-if="options">
        <div v-if="showSearchField" class="w-full p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            :disabled="disabled"
            class="w-full search-input"
            placeholder="Search..."
          />
        </div>
        <div class="flex justify-content-between align-items-center mt-2 px-2">
          <div>
            <span class="text-xl font-bold">{{ optionTitle }}</span>
          </div>
          <div class="flex gap-4">
            <span class="text-xl font-bold">{{ optionAnswer }}</span>
            <span class="text-xl font-bold pr-1">{{ optionSelect }}</span>
          </div>
        </div>
        <div
          v-if="inputOptions?.length"
          class="option-container overflow-y-scroll mt-1"
        >
          <label
            v-for="option of inputOptions"
            :key="option.value"
            :for="option.value.toString()"
            class="checkbox-field hover:text-blue-600 flex align-items-center justify-content-between"
          >
            <div>
              <QuestionCardTitle :title="option.label?.split('![](')[0]" />
              <Button
                v-if="option.label?.split('![](')[1]"
                :onclick="() => (viewWithImage = !viewWithImage)"
                class="view-title-image p-button-text px-0"
              >
                <img
                  class="view-image"
                  :src="'/images/icons/view-title-image.svg'"
                  alt=""
                />

                <QuestionCardTitleImage
                  :visible="viewWithImage"
                  :title="option.label?.split('![](')[0]"
                  :image-src="option.label?.split('![](')[1].slice(0, -1)"
                  @on-close="() => (viewWithImage = !viewWithImage)"
                />
                <span class="view-image-text">View images</span>
              </Button>
            </div>
            <div class="flex gap-7">
              <div class="flex align-items-center justify-content-center">
                <span class="mr-4 md:mr-5 font-light text-color-secondary">
                  <QuestionCardOptionsAnswer :option="option?.correct_answer" />
                </span>
              </div>
              <div class="flex align-items-center justify-content-center">
                <Checkbox
                  v-model="selectedOptions"
                  :disabled="
                    option?.modelTest ? option.modelTest.length : false
                  "
                  :input-class="'checkbox-icon'"
                  :input-id="option.value.toString()"
                  :value="option.value"
                  @click.prevent
                />
              </div>
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
type option = {
  label: string;
  answer: string | number;
  value: string | number;
};

// define props
const props = defineProps<{
  name?: string;
  label?: string;
  optionTitle?: string;
  optionAnswer?: string;
  optionSelect?: string;
  required?: boolean;
  options: option[] | null;
  values?: number[] | string[];
  showSearchField?: boolean;
  searchQuery?: string;
  disabled?: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", values: string[] | number[]): void;
}>();

// define states
const searchQuery = ref(props.searchQuery ?? "");
const viewWithImage = ref(false);
const selectedOptions = ref([]);
const showForm = ref(true);

// computed properties
const inputOptions = computed(() => {
  return props?.options?.filter((option: { label: string | string[] }) => {
    return option.label.toLowerCase().includes(searchQuery.value);
  });
});

// methods
onUpdated(() => {
  if (props.searchQuery) searchQuery.value = props.searchQuery;
  emits("onValueChange", selectedOptions.value);
});

watch(
  () => props.values,
  () => {
    selectedOptions.value = [
      ...new Set(selectedOptions.value.concat(props.values)),
    ];
  }
);
</script>

<style lang="scss" scoped>
.label {
  font-family: "Poppins", serif;
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
  border: 0;
}

.search-input {
  height: 40px;
}

.checkbox-field {
  background: #fdfdfd;
  padding: 10px 10px 10px 8px;
  border-bottom: 2px solid #f5f5f5;
  font-family: "Poppins", serif;
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
  margin: 3px 0;
}
</style>
