<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, FileText, Scale } from 'lucide-vue-next'

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
    <header class="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div class="px-4 sm:px-6 lg:px-8 py-4">

            <!-- Top row: Brand + Icon Actions -->
            <div class="flex items-center justify-between gap-3">

                <!-- Brand -->
                <div class="flex items-baseline gap-2 min-w-0">
                    <h1 class="text-2xl sm:text-3xl font-black text-foreground leading-none tracking-tight truncate">
                        ক্যাশবক্স
                    </h1>
                    <span class="text-sm font-light text-muted-foreground hidden sm:inline tracking-widest uppercase">
                        Cashbox
                    </span>
                </div>

                <!-- Icon actions — always visible, compact -->
                <div class="flex items-center gap-2 shrink-0">

                    <!-- Balance visibility toggle -->
                    <Button variant="ghost" size="icon"
                        class="h-9 w-9 rounded-lg border border-border/60 hover:bg-muted hover:border-border transition-colors"
                        @click="emit('update:showBalance', !props.showBalance)"
                        :aria-label="props.showBalance ? 'Hide balance' : 'Show balance'">
                        <Eye v-if="props.showBalance" class="h-4 w-4 text-muted-foreground" />
                        <EyeOff v-else class="h-4 w-4 text-muted-foreground" />
                    </Button>

                    <!-- Reconcile — label hidden on xs -->
                    <Button variant="outline" size="sm"
                        class="h-9 px-2.5 sm:px-3 border-border/60 hover:bg-muted hover:border-border transition-colors">
                        <Scale class="h-4 w-4 shrink-0" />
                        <span class="hidden sm:inline ml-1.5 text-xs font-medium">মিলাই</span>
                    </Button>

                    <!-- Report — always shows label on sm+ -->
                    <Button size="sm" class="h-9 px-2.5 sm:px-3 transition-all">
                        <FileText class="h-4 w-4 shrink-0" />
                        <span class="hidden sm:inline ml-1.5 text-xs font-semibold">রিপোর্ট</span>
                    </Button>

                </div>
            </div>

            <!-- Bottom row: subtitle + period tabs -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">

                <!-- Subtitle -->
                <p class="text-sm font-medium text-muted-foreground leading-none">
                    আজকের আর্থিক সারসংক্ষেপ
                </p>

                <!-- Period tabs — full width on xs, auto on sm+ -->
                <div class="flex bg-muted/60 rounded-lg p-1 border border-border/50 w-full sm:w-auto">
                    <Button v-for="p in periods" :key="p.id" variant="ghost" size="sm"
                        class="flex-1 sm:flex-none h-8 px-4 sm:px-5 text-xs font-semibold rounded-md transition-all duration-150"
                        :class="props.selectedPeriod === p.id
                            ? 'bg-background text-foreground shadow-sm border border-border/60'
                            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'"
                        @click="emit('update:selectedPeriod', p.id)">
                        {{ p.label }}
                    </Button>
                </div>

            </div>
        </div>
    </header>
</template>