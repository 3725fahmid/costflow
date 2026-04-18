<script setup lang="ts">
/**
 * Example: Settings page
 * Shows how any other page simply wraps its content in <DashboardLayout>.
 * The sidebar + header are handled automatically.
 */
definePageMeta({ layout: 'default' })
import DashboardLayout from "@/layout/default.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
</script>

<template>
    <DashboardLayout>
        <!-- Optional: inject a page-specific button into the header -->
        <template #header-actions>
            <Button variant="outline" size="sm">Save changes</Button>
        </template>

        <!-- Page content -->
        <div class="px-4 lg:px-6">
            <h1 class="text-2xl font-semibold mb-6">Settings</h1>
            <!-- your settings sections here -->
            <Input placeholder="Enter text" />
        </div>
    </DashboardLayout>
</template>