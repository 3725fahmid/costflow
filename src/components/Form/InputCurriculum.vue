<template>
  <div class="">
    <FormInputDropdown
      :name="'Curriculum'"
      :label="label"
      :placeholder="placeholder"
      :options="curriculumOptions"
      :value="selectedCurriculum"
      :disabled="disabled"
      :required="required"
      :loading="store.loading"
      class="w-full"
      @on-value-change="(value) => emits('onValueChange', value)"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { Ref } from "vue";
import CurriculumService from "~/services/Curriculum.Service";
import { useCurriculumStore } from "~~/src/stores/curriculum.store";
import { useStore } from "~~/src/stores/store";
import { CurriculumContract } from "~~/contracts/api-constracts/curriculum-contract";

// define hooks
const toast = useToast();

// define props
const props = defineProps<{
  value?: number | null;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  label?: string;
  placeholder?: string;
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: number): void;
}>();

// define hooks
const store = useStore();
const curriculumStore = useCurriculumStore();

// Declare states
const selectedCurriculum: Ref<number | null | undefined> = ref(props.value);

const curriculumOptions = computed(() => {
  const filterByType = (curriculum: CurriculumContract) =>
    curriculum.type === props.type;

  const mapToOption = (curriculum: CurriculumContract) => ({
    label: curriculum.name,
    value: curriculum.id,
  });

  const curriculums = props.type
    ? curriculumStore.curriculums.filter(filterByType).map(mapToOption)
    : curriculumStore.curriculums.map(mapToOption);

  return curriculums;
});

const fetchCurriculums = async () => {
  store.loading = true;
  const response = await CurriculumService.fetch("pagination=false");
  store.loading = false;

  if (!response.success || !response.data) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: response.message,
      life: 3000,
    });
    return;
  }

  curriculumStore.setCurriculum(response.data);
};

// methods
onMounted(async () => {
  if (!curriculumStore.curriculums.length) await fetchCurriculums();
});

onUpdated(() => {
  if (!selectedCurriculum.value && props.value) {
    selectedCurriculum.value = props.value;
  }
});
</script>

<style scoped></style>
