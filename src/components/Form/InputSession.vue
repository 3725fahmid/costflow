<template>
  <div class="">
    <FormInputDropdown
      :name="'Session'"
      :label="label ?? 'Select Session'"
      :placeholder="placeHolder ?? 'Select Session'"
      :options="sessionOptions"
      :value="selectedSession"
      :required="required"
      :disabled="disabled"
      @on-value-change="(value) => emits('onValueChange', value)"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import SessionsService from "~/services/Sessions.Service";
import { useSessionStore } from "~~/src/stores/sessions.store";

// define hooks
const toast = useToast();
const sessionStore = useSessionStore();

// define props
const props = defineProps<{
  label?: string;
  placeHolder?: string;
  value?: number | string | null;
  curriculumId: number | string | null;
  required?: boolean;
  disabled?: boolean;
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: string | number): void;
}>();

// Declare states
const sessionsData = ref(null);
const selectedSession = ref();

const sessionOptions = computed(() => {
  if (!sessionsData.value) return null;

  return sessionsData.value
    ?.filter(
      (session: { curriculum_id: string | number | null }) =>
        props?.curriculumId === session?.curriculum_id
    )
    ?.map((session: { name: any; id: any }) => {
      return {
        label: session?.name,
        value: session?.id,
      };
    });
});

const fetchSessions = async () => {
  const response = await SessionsService.fetch();

  if (!response.success || !response.data) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: response.message,
      life: 3000,
    });

    return;
  }

  sessionStore.setSessions(response.data);
  sessionsData.value = [...sessionStore.sessions];
};

// methods
onMounted(() => {
  if (sessionStore.sessions.length) {
    sessionsData.value = [...sessionStore.sessions];

    return;
  }

  fetchSessions();
});

onUpdated(() => {
  if (props.value && !selectedSession.value) {
    selectedSession.value = props.value;
  }
});
</script>

<style scoped></style>
