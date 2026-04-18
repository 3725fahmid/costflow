<template>
  <div>
    <FormInputDropdown
      :name="'Subject'"
      :label="label ?? 'Please Select Subject'"
      :placeholder="placeHolder ?? 'Please Select Subject'"
      :value="subjectValue"
      :disabled="disabled"
      :options="subjectOptions"
      :loading="loading"
      :required="required"
      class="w-full"
      @on-value-change="subjectChangeHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { useToast } from "primevue/usetoast";
import Subject from "~~/src/services/Subject.Service";
import { SubjectContract } from "~~/contracts/api-constracts/question-contract";
import { useSubjectStore } from "~~/src/stores/subject.store";

// define props
const props = defineProps<{
  label?: string;
  placeHolder?: string;
  value?: number | null;
  required?: boolean;
  disabled?: boolean;
  curriculumId?: number | string | null;
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: number): void;
}>();

// Hooks
// const Subject = new SubjectService();
const toast = useToast();
const SubjectStore = useSubjectStore();

// declare states
const allSubjects: Ref<SubjectContract[] | null> = ref(null);
const loading = ref(false);
const subjectOptions = ref();
const subjectValue = ref(props.value);

// computed properties
const formatSubjectOptions = () => {
  if (!allSubjects.value) return;

  const subjectsOption = props.curriculumId
    ? allSubjects.value?.filter(
        (subject: { curriculum_id: string | number | null | undefined }) =>
          subject.curriculum_id === props.curriculumId
      )
    : allSubjects.value;

  return subjectsOption?.map((subject: { name: any; id: any }) => {
    return {
      label: subject?.name,
      value: subject?.id,
    };
  });
};

// methods
onMounted(async () => {
  loading.value = true;

  if (SubjectStore.subjects.length) {
    allSubjects.value = SubjectStore.subjects;
  } else {
    const response = await Subject.fetch("pagination=false");

    if (response.success) {
      allSubjects.value = response.data;
      SubjectStore.setSubjects(response.data);
    } else {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: response.message,
        life: 3000,
      });
    }
  }

  subjectOptions.value = formatSubjectOptions();
  loading.value = false;
});

onUpdated(() => {
  if (props.curriculumId) {
    subjectOptions.value = formatSubjectOptions();
  }

  if (props.value !== subjectValue.value) {
    subjectValue.value = props.value;
  }
});

const subjectChangeHandler = (value: number | string) => {
  emits("onValueChange", value);
};
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
