<script setup lang="ts">
/**
 * Example: Settings page
 * Shows how any other page simply wraps its content in <DashboardLayout>.
 * The sidebar + header are handled automatically.
 */
// definePageMeta({ layout: 'default' })
import { ref, reactive } from "vue"
import DashboardLayout from "@/layout/default.vue"
import { Button } from "@/components/ui/button"
import DatePicker from "@/components/datepicker/DatePicker.vue"
import type { DateValue } from "@internationalized/date"

// Form state
const form = reactive({
    name: "",
    email: "",
    date: null as DateValue | null
})

// Error state
const errors = reactive({
    name: "",
    email: "",
    date: ""
})

// Validate function
const validate = () => {
    let valid = true

    // Name validation
    if (!form.name.trim()) {
        errors.name = "Name is required"
        valid = false
    } else {
        errors.name = ""
    }

    // Email validation
    if (!form.email.trim()) {
        errors.email = "Email is required"
        valid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "Invalid email format"
        valid = false
    } else {
        errors.email = ""
    }

    // Date validation
    if (!form.date) {
        errors.date = "Date is required"
        valid = false
    } else {
        errors.date = ""
    }

    return valid
}

// Submit handler
const handleSubmit = () => {
    if (!validate()) return

    console.log({
        name: form.name,
        email: form.email,
        date: form.date?.toString()
    })

    // Optional: reset form
    form.name = ""
    form.email = ""
    form.date = null
}

// const handleSubmit = async () => {
//   if (!validate()) return

//   const api = useApi()

//   try {
//     const response = await api('/submit-form', {
//       method: 'POST',
//       body: {
//         name: form.name,
//         email: form.email,
//         date: form.date?.toString()
//       }
//     })

//     console.log('Success:', response)

//   } catch (error: any) {
//     console.error('Error:', error?.data || error)

//     // backend validation errors
//     if (error?.data?.errors) {
//       errors.name = error.data.errors.name || ''
//       errors.email = error.data.errors.email || ''
//       errors.date = error.data.errors.date || ''
//     }
//   }
// }

</script>

<template>
    <DashboardLayout>
        <div class="px-4 lg:px-6">
            <h1 class="text-2xl font-semibold mb-6">Welcome Page</h1>
            <ThemeToggle />
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4 px-4 lg:px-6 mt-6">

            <!-- Name -->
            <div class="grid gap-2">
                <Label>Name</Label>
                <input v-model="form.name" type="text" class="border rounded px-3 py-2" placeholder="Enter your name" />
                <span v-if="errors.name" class="text-red-500 text-sm">
                    {{ errors.name }}
                </span>
            </div>

            <!-- Email -->
            <div class="grid gap-2">
                <Label>Email</Label>
                <input v-model="form.email" type="email" class="border rounded px-3 py-2"
                    placeholder="Enter your email" />
                <span v-if="errors.email" class="text-red-500 text-sm">
                    {{ errors.email }}
                </span>
            </div>

            <!-- Date -->
            <div class="grid gap-2">
                <Label>Date</Label>
                <DatePicker v-model="form.date" />
                <span v-if="errors.date" class="text-red-500 text-sm">
                    {{ errors.date }}
                </span>
            </div>

            <!-- Submit -->
            <Button type="submit">Submit</Button>

        </form>
    </DashboardLayout>
</template>