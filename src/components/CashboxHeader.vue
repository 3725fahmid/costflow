<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, FileText, Scale } from 'lucide-vue-next'
import { Card } from './ui/card';

interface Props {
    selectedPeriod: 'today' | 'week' | 'month'
    showBalance: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'update:selectedPeriod', value: 'today' | 'week' | 'month'): void
    (e: 'update:showBalance', value: boolean): void
}>()

const periods = [
    { id: 'today' as const, label: 'আজ' },
    { id: 'week' as const, label: 'সপ্তাহ' },
    { id: 'month' as const, label: 'মাস' }
]
</script>

<template>
    <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-6 lg:px-8 border-b border-border bg-gradient-to-r from-background/50 to-muted/50 backdrop-blur-sm sticky top-0 z-50">
        <!-- Left -->
        <div class="max-w-md">
            <h1
                class="text-3xl lg:text-4xl font-black bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent mb-1.5 leading-tight">
                ক্যাশবক্স
                <span class="block text-xl font-light text-muted-foreground -mt-1 tracking-wide">
                    / Cashbox
                </span>
            </h1>

            <p class="text-lg font-medium text-muted-foreground leading-relaxed">
                আজকের আর্থিক সারসংক্ষেপ
            </p>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-3 flex-wrap">

            <!-- Period Tabs -->
            <div class="flex bg-muted/50 rounded-full p-1 border border-border/50 w-full sm:w-auto">
                <Button v-for="p in periods" :key="p.id" variant="ghost" size="sm"
                    class="h-10 px-3 py-2 flex-1 text-xs font-semibold rounded-full transition-all" :class="{
                        'bg-primary text-primary-foreground shadow-sm': props.selectedPeriod === p.id
                    }" @click="emit('update:selectedPeriod', p.id)">
                    {{ p.label }}
                </Button>
            </div>

            <!-- Balance Toggle -->
            <Button variant="ghost" size="sm"
                class="h-10 w-10 p-0 rounded-xl hover:bg-muted/50 border border-border/50 shadow-sm"
                @click="emit('update:showBalance', !props.showBalance)">
                <Eye v-if="props.showBalance" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
            </Button>

            <!-- Balance Button -->
            <Button variant="outline" size="sm"
                class="h-10 px-3 text-xs font-medium border-border/50 hover:bg-muted/50 hover:border-border">
                <Scale class="h-4 w-4 mr-1.5" />
                মিলাই
            </Button>

            <!-- Report Button -->
            <Button size="sm" class="h-10 px-3 text-xs font-semibold shadow-sm hover:shadow-md transition-all">
                <FileText class="h-4 w-4 mr-1.5" />
                রিপোর্ট
            </Button>

        </div>
    </div>
</template>

<style scoped>
/* ✅ Empty on purpose — no Tailwind @apply here */
</style>