<script setup lang="ts">
/**
 * Example: Settings page
 * Shows how any other page simply wraps its content in <DashboardLayout>.
 * The sidebar + header are handled automatically.
 */
definePageMeta({ layout: 'default' })
import DashboardLayout from "@/layout/default.vue"
import { Button } from "@/components/ui/button"
import DatePicker from '@/components/datepicker/DatePicker.vue'
import type { DateValue } from '@internationalized/date'

const date = ref<DateValue | null>(null)
</script>

<template>
    <DashboardLayout>
        <!-- Page content -->
        <div class="px-4 lg:px-6">
            <h1 class="text-2xl font-semibold mb-6">Welcome Page</h1>
            <ThemeToggle />
            <!-- your settings sections here -->
        </div>

        <div class="grid gap-2">
            <Label>Date</Label>
            <DatePicker v-model="date" />
        </div>
    </DashboardLayout>
</template>