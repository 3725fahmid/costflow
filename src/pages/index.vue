<script setup lang="ts">
/**
 * Example: Settings page
 * Shows how any other page simply wraps its content in <DashboardLayout>.
 * The sidebar + header are handled automatically.
 */
// definePageMeta({ layout: 'default' })
import DashboardLayout from "@/layout/default.vue"
import { Button } from "@/components/ui/button"
import DatePicker from '@/components/datepicker/DatePicker.vue'
import type { DateValue } from '@internationalized/date'

const date = ref<string | null>(null)

const form = reactive({
    date: null as string | null,
    name: '',
    email: ''
})

const handleSubmit = () => {
    console.log({
        ...form,
        date: form.date?.toString()
    })
}

// const handleSubmit = async () => {
//   try {
//     const response = await $fetch('http://127.0.0.1:8000/api/submit-form', {
//       method: 'POST',
//       body: {
//         name: form.name,
//         email: form.email,
//         date: form.date,
//       }
//     })

//     console.log('Success:', response)

//   } catch (error: any) {
//     console.error('Error:', error?.data || error)
//   }
// }

</script>

<template>
    <DashboardLayout>
        <!-- Page content -->
        <div class="px-4 lg:px-6">
            <h1 class="text-2xl font-semibold mb-6">Welcome Page</h1>
            <ThemeToggle />
            <!-- your settings sections here -->
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">

            <!-- Name -->
            <div class="grid gap-2">
                <Label>Name</Label>
                <input v-model="form.name" type="text" class="border rounded px-3 py-2" placeholder="Enter your name" />
            </div>

            <!-- Email -->
            <div class="grid gap-2">
                <Label>Email</Label>
                <input v-model="form.email" type="email" class="border rounded px-3 py-2"
                    placeholder="Enter your email" />
            </div>

            <!-- Date -->
            <div class="grid gap-2">
                <Label>Date</Label>
                <DatePicker v-model="form.date" />
            </div>

            <!-- Submit -->
            <Button type="submit">Submit</Button>

        </form>
    </DashboardLayout>
</template>