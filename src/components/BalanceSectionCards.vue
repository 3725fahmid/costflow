<script setup lang="ts">
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-vue"
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

// Props interface
interface Stats {
    todaySale: number
    currentCash: number
    todayReceived: number
    todayPaid: number
    dueCollection: number
    paymentGiven: number
}

interface Props {
    stats: Stats
    showBalance: boolean
    netFlow: number
}

const props = withDefaults(defineProps<Props>(), {
    showBalance: true
})

const fmt = (n: number) =>
    new Intl.NumberFormat('en-BD', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(n)

const fmtShort = (n: number) => {
    if (n >= 100000) return (n / 100000).toFixed(1) + 'L'
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
    return n.toString()
}

// Stat card configuration
const statCards = [
    {
        title: 'আজকের বেচা',
        titleEn: "Today's Sale",
        value: props.stats.todaySale,
        badge: '+8.4%',
        badgeClass: 'up',
        icon: 'check-circle',
        color: '#16a34a',
        bg: '#f0fdf4',
        valueColor: '#16a34a'
    },
    {
        title: 'বর্তমান ক্যাশ',
        titleEn: "Current Cash",
        value: props.stats.currentCash,
        badge: 'ব্যালেন্স',
        badgeClass: '',
        icon: 'credit-card',
        color: '#2563eb',
        bg: '#eff6ff',
        valueColor: '#2563eb'
    },
    {
        title: 'আজ পেলাম',
        titleEn: "Received Today",
        value: props.stats.todayReceived,
        badge: 'আদায়',
        badgeClass: 'up',
        icon: 'arrow-up-circle',
        color: '#16a34a',
        bg: '#f0fdf4',
        valueColor: '#16a34a'
    },
    {
        title: 'আজ দিলাম',
        titleEn: "Paid Today",
        value: props.stats.todayPaid,
        badge: 'দেনা',
        badgeClass: 'down',
        icon: 'arrow-down-circle',
        color: '#dc2626',
        bg: '#fef2f2',
        valueColor: '#dc2626'
    },
    {
        title: 'নেট প্রবাহ',
        titleEn: "Net Flow",
        value: Math.abs(props.netFlow),
        badge: 'নেট',
        badgeClass: props.netFlow >= 0 ? 'up' : 'down',
        icon: 'trending-up',
        color: props.netFlow >= 0 ? '#16a34a' : '#dc2626',
        bg: props.netFlow >= 0 ? '#f0fdf4' : '#fef2f2',
        valueColor: props.netFlow >= 0 ? '#16a34a' : '#dc2626'
    },
    {
        title: 'বাকি আদায়',
        titleEn: "Due Collection",
        value: props.stats.dueCollection,
        badge: 'বাকি',
        badgeClass: 'warn',
        icon: 'clock',
        color: '#ea580c',
        bg: '#fff7ed',
        valueColor: '#ea580c'
    }
]
</script>

<template>
    <div class="grid grid-cols-1 gap-1 px-1 lg:px-1 @xl/main:grid-cols-3 @5xl/main:grid-cols-4">
        <Card v-for="(card, index) in statCards" :key="card.title" class="@container/card"
            :style="{ 'animation-delay': `${index * 0.04}s` }">
            <CardHeader>
                <CardDescription class="stat-label">
                    {{ card.title }} <em>{{ card.titleEn }}</em>
                </CardDescription>
                <CardTitle class="stat-value text-xl font-semibold tabular-nums @[250px]/card:text-xl"
                    :style="{ color: card.valueColor }">
                    {{ props.showBalance ? fmt(card.value) : '••••••' }}
                </CardTitle>
                <CardAction>
                    <Badge variant="outline" :class="card.badgeClass" :style="{
                        backgroundColor: card.bg,
                        color: card.color,
                        borderColor: card.color
                    }">
                        <component :is="card.badgeClass.includes('up') ? IconTrendingUp : IconTrendingDown"
                            class="size-4" />
                        {{ card.badge }}
                    </Badge>
                </CardAction>
            </CardHeader>
        </Card>
    </div>
</template>

<style scoped>
.stat-label em {
    font-style: italic;
    font-size: 0.875rem;
    opacity: 0.7;
}

.stat-value {
    font-feature-settings: "tnum" 1;
}
</style>