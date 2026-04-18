<script setup lang="ts">
import { Sun, Moon, Monitor } from "lucide-vue-next"
import { useTheme } from "@/composables/useTheme"

const { theme, setTheme } = useTheme()
</script>

<template>
    <button class="cursor-pointer" @click="setTheme(theme === 'dark' ? 'light' : 'dark')">
        <Sun v-if="theme === 'dark'" />
        <Moon v-else-if="theme === 'light'" />
        <Monitor v-else />
    </button>
</template>