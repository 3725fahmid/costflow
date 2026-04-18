<template>
  <div v-if="renderList">
    <FormInputMultiSelectListScrolable
      :name="'Subject'"
      :label="'Please Select Subject'"
      :options="subjectOptions"
      :values="values"
      :required="required"
      :disabled="disabled"
      :loading="loading"
      @on-value-change="(value) => emits('onValueChange', value)"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import Subject from "~~/src/services/Subject.Service";

// define props
const props = defineProps<{
  values?: number[] | string[] | null;
  required?: boolean;
  disabled?: boolean;
  curriculumId?: number | string | null;
  sessionId?: number | string | null;
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: string[] | number[]): void;
}>();

// Hooks
// const Subject = new SubjectService();
const toast = useToast();

// declare states
const allSubjects = ref(null);
const loading = ref();
const curriculumId = ref();
const sessionId = ref();
const renderList = ref(true);

// computed properties
const subjectOptions = computed(() => {
  if (props.disabled) return null;

  if (!allSubjects.value) return null;

  const subjectsOption = curriculumId.value
    ? allSubjects.value?.filter(
        (subject: { curriculum_id: string | number | null | undefined }) =>
          subject.curriculum_id === curriculumId.value
      )
    : [];

  return subjectsOption?.map(
    (subject: { name: any; __meta__: { questions_count: any }; id: any }) => {
      return {
        label: subject?.name,
        count: subject?.__meta__?.questions_count,
        value: subject?.id,
      };
    }
  );
});

// methods
onMounted(async () => {
  const subjects = await Subject.fetch("count=question");

  if (subjects.success) {
    allSubjects.value = subjects.data;
  } else {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: subjects.message,
      life: 3000,
    });
  }
});

onUpdated(async () => {
  if (
    props.curriculumId !== curriculumId.value ||
    props.sessionId !== sessionId.value
  ) {
    renderList.value = false;
    await nextTick();
    renderList.value = true;

    loading.value = true;
    curriculumId.value = props.curriculumId;
    sessionId.value = props.sessionId;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
});
</script>

<style scoped>
.label {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}
</style>
