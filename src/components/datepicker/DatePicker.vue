<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { DateFormatter, CalendarDate, fromDate, getLocalTimeZone, today } from '@internationalized/date'

import { CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

// ✅ props + emit (important)
const props = defineProps<{
    modelValue?: DateValue
}>()

const emit = defineEmits(['update:modelValue'])

const defaultPlaceholder = today(getLocalTimeZone())

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
})

// ✅ computed getter/setter for v-model
const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})
</script>

<template>
    <Popover v-slot="{ close }">
        <PopoverTrigger as-child>
            <Button variant="outline" :class="cn(
                'w-full justify-start text-left font-normal',
                !value && 'text-muted-foreground'
            )">
                <CalendarIcon class="mr-2 h-4 w-4" />

                {{ value
                    ? df.format(value.toDate(getLocalTimeZone()))
                    : 'Pick a date'
                }}
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0" align="start">
            <Calendar v-model="value" :default-placeholder="defaultPlaceholder" layout="month-and-year" initial-focus
                @update:model-value="close" :min-value="new CalendarDate(2000, 1, 1)"
                :max-value="new CalendarDate(2035, 1, 1)" />
        </PopoverContent>
    </Popover>
</template>