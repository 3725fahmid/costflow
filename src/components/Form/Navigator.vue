<template>
  <div class="flex justify-content-end">
    <Button
      v-if="currentPage !== 1"
      class="p-button-secondary mr-3"
      icon="pi pi-arrow-left"
      label="Back"
      @click="prevPage"
    />

    <Button
      class="next-button"
      :icon="currentPage === totalSteps ? '' : 'pi pi-arrow-right'"
      icon-pos="right"
      :disabled="disableNextButton"
      :loading="store.loading"
      :label="currentPage === totalSteps ? 'Submit' : 'Next'"
      @click="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~~/src/stores/store";

// define props
const props = defineProps<{
  totalSteps: number;
  currentPage: number;
  disableNextButton?: boolean;
}>();

// define event
const emits = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

// hooks
const store = useStore();

// States
const nextPage = () => {
  const page = props.currentPage + 1;
  emits("pageChange", page);
};

const prevPage = () => {
  const page = props.currentPage - 1;
  emits("pageChange", page);
};
</script>

<style lang="scss" scoped>
Button {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 12px;

  width: 124px;
  height: 40px;
  border-radius: 6px;
}

.next-button {
  background: #ff9100;
}
</style>
