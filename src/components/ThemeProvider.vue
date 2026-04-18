<script setup lang="ts">
import { provide, ref, watch, onMounted } from "vue"

type Theme = "dark" | "light" | "system"

const props = withDefaults(
    defineProps<{
        defaultTheme?: Theme
        storageKey?: string
    }>(),
    {
        defaultTheme: "system",
        storageKey: "vite-ui-theme",
    }
)

const theme = ref<Theme>(props.defaultTheme)

onMounted(() => {
    theme.value = (localStorage.getItem(props.storageKey) as Theme) || props.defaultTheme
})

const setTheme = (newTheme: Theme) => {
    if (import.meta.client) {
        localStorage.setItem(props.storageKey, newTheme)
    }
    theme.value = newTheme
}

watch(
    theme,
    (val) => {
        if (!import.meta.client) return

        const root = document.documentElement
        root.classList.remove("light", "dark")

        if (val === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(val)
    },
    { immediate: true }
)

provide("theme", { theme, setTheme })
</script>

<template>
    <slot />
</template>