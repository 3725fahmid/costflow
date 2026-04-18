<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useStore } from "~~/src/stores/store";
import SubjectService from "~~/src/services/Subject.Service";
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
const toast = useToast();
const store = useStore();
const subjectStore = useSubjectStore();

// declare states
const allSubjects: Ref<SubjectContract[] | null> = ref(null);
const loading = ref(false);
const subjectOptions = ref(null);
const subjectValue = ref(props.value);

// computed properties
const fetchSubjects = async () => {
  store.loading = true;
  const response = await SubjectService.fetch("pagination=false");
  store.loading = false;

  if (!response.success) {
    toast.add({
      severity: "error",
      summary: "Error!",
      detail: response.message,
      life: 3000,
    });

    return;
  }

  subjectStore.setSubjects(response.data);
  subjectOptions.value = formatSubjectOptions();
};

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

const subjectChangeHandler = (value: number | string) => {
  emits("onValueChange", value);
};

// methods
onMounted(async () => {
  if (!subjectStore.subjects.length) await fetchSubjects();
  allSubjects.value = subjectStore.subjects;
  subjectOptions.value = formatSubjectOptions();
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
