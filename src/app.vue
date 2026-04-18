<script setup lang="ts">
import ThemeProvider from "@/components/ThemeProvider.vue"
</script>
<template>
  <div>
    <ThemeProvider default-theme="system" storage-key="vite-ui-theme">
      <NuxtPage />
    </ThemeProvider>
  </div>
</template>
