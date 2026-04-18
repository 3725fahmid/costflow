<template>
  <div>
    <div class="flex">
      <div v-for="(item, index) in items" :key="item.step">
        <a v-if="item.step < maxAllowedState" href="" class="flex">
          <Button
            icon="pi pi-bookmark"
            class="p-button-rounded p-button-primary"
          >
            <span class="font-bold text-lg">{{ item.step }}</span>
          </Button>
          <div class="label ml-2">
            {{ item.label }}
            <span v-if="index + 1 != items.length" class="mx-5">
              <i class="pi pi-chevron-right" />
            </span>
          </div>
        </a>

        <div v-else class="flex">
          <Button
            icon="pi pi-bookmark"
            class="p-button-rounded p-button-secondary"
          >
            <span class="font-bold text-lg">{{ item.step }}</span>
          </Button>
          <div class="label ml-2">
            {{ item.label }}
            <span v-if="index + 1 != items.length" class="mx-5">
              <i class="pi pi-chevron-right" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Step = {
  label: string;
  step: number;
  active: boolean;
};

// define props
const props = defineProps<{
  items: Step[];
  maxAllowedState: number;
}>();

// define events
const emits = defineEmits<{
  (e: "stepChange", nextStep: number): void;
}>();
</script>

<style scoped>
.label {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  display: flex;
  align-items: center;

  /* color: #3e3e3e; */
}
</style>
