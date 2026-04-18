<script lang="ts">
definePageMeta({ layout: 'default' })
export const iframeHeight = "800px"
export const description = "A dashboard with sidebar, data table, and analytics cards."
</script>

<script setup lang="ts">
import DashboardLayout from "@/layout/default.vue"
import ChartAreaInteractive from "@/components/ChartAreaInteractive.vue"
import SectionCards from "@/components/SectionCards.vue"
// import DataTable from "@/components/DataTable.vue"

const data = [
    {
        id: 1,
        header: "Cover page",
        type: "Cover page",
        status: "In Process",
        target: "18",
        limit: "5",
        reviewer: "Eddie Lake",
    },
    {
        id: 2,
        header: "Table of contents",
        type: "Table of contents",
        status: "Done",
        target: "29",
        limit: "24",
        reviewer: "Eddie Lake",
    },
    // ... rest of your data
]
</script>

<template>
    <DashboardLayout>
        <!-- ── Dashboard-specific header action (optional) ── -->
        <!-- <template #header-actions>
            <Button size="sm">Export</Button>
        </template> -->

        <!-- ── Dashboard page content ── -->
        <SectionCards />

        <div class="px-4 lg:px-6">
            <ChartAreaInteractive />
        </div>

        <!-- <DataTable :data="data" /> -->
    </DashboardLayout>
</template>