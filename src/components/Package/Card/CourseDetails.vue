<template>
  <div class="flex flex-wrap">
    <div>
      <span v-if="values?.length">
        {{ values.slice(0, 300) }}
      </span>

      <span v-show="!collapsed">
        {{ values.slice(300) }}
      </span>
    </div>

    <div class="w-full">
      <CommonLoadMore
        v-if="values?.length > 300"
        :collapsed="collapsed"
        @on-click="collapsed = !collapsed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  values: string;
}>();
const collapsed = ref(true);
</script>

<style scoped lang="scss"></style>
