<script setup lang="ts">
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-vue"

interface CashboxItem {
    id: string
    label: string
    labelEn: string
    amount: number
    change: number
    type: 'income' | 'expense'
    color: string
    bg: string
    borderColor: string
}

interface Props {
    items: CashboxItem[]
    showBalance: boolean
    sparkData: Record<string, number[]>
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'view-all'): void
    (e: 'details', id: string): void
}>()

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

function sparkPath(vals: number[]): string {
    const w = 80, h = 32
    const min = Math.min(...vals), max = Math.max(...vals)
    const range = max - min || 1
    const pts = vals.map((v, i) => {
        const x = (i / (vals.length - 1)) * w
        const y = h - ((v - min) / range) * h
        return `${x},${y}`
    })
    return `M${pts.join(' L')}`
}
</script>

<template>
    <div class="cb-section">
        <div class="cb-section-header">
            <h2 class="cb-section-title">
                লেনদেনের বিবরণ
                <span>Transaction Details</span>
            </h2>
            <button class="view-all-btn" @click="$emit('view-all')">
                সব দেখুন →
            </button>
        </div>

        <div class="cb-table-wrap">
            <table class="cb-table">
                <thead>
                    <tr>
                        <th>বিভাগ</th>
                        <th class="hide-sm">ধরন</th>
                        <th>পরিমাণ</th>
                        <th class="hide-md">ট্রেন্ড</th>
                        <th class="hide-sm">পরিবর্তন</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, idx) in props.items" :key="item.id" class="cb-row"
                        :style="{ animationDelay: idx * 0.06 + 's' }">
                        <!-- Category Column -->
                        <td class="td-category">
                            <div class="cat-icon" :style="{
                                background: item.bg,
                                borderColor: item.borderColor
                            }">
                                <svg v-if="item.id === 'cash-sale'" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" :stroke="item.color" stroke-width="2">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                    <path d="M8 12l3 3 5-5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <svg v-else-if="item.id === 'cash-buy'" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" :stroke="item.color" stroke-width="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <svg v-else-if="item.id === 'expense'" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" :stroke="item.color" stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <svg v-else-if="item.id === 'owner-gave'" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" :stroke="item.color" stroke-width="2">
                                    <path d="M20 12V22H4V12" />
                                    <path d="M22 7H2v5h20V7z" />
                                    <path d="M12 22V7" />
                                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                                </svg>
                                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="item.color"
                                    stroke-width="2">
                                    <path d="M20 12V22H4V12" />
                                    <path d="M22 7H2v5h20V7z" />
                                    <path d="M12 22V7" />
                                </svg>
                            </div>
                            <div class="cat-text">
                                <span class="cat-name">{{ item.label }}</span>
                                <span class="cat-sub">{{ item.labelEn }}</span>
                            </div>
                        </td>

                        <!-- Type Column -->
                        <td class="hide-sm">
                            <span class="type-badge" :class="item.type">
                                {{ item.type === 'income' ? 'আয়' : 'ব্যয়' }}
                            </span>
                        </td>

                        <!-- Amount Column -->
                        <td class="td-amount">
                            <span class="amount-val" :class="item.type">
                                {{ item.type === 'income' ? '+' : '−' }}
                                {{ props.showBalance ? fmt(item.amount) : '••••••' }}
                            </span>
                            <span class="amount-short">{{ fmtShort(item.amount) }}</span>
                        </td>

                        <!-- Sparkline Column -->
                        <td class="hide-md td-spark">
                            <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
                                <path :d="sparkPath(props.sparkData[item.id])" :stroke="item.color" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".8" />
                                <path :d="sparkPath(props.sparkData[item.id]) + ' L80,32 L0,32 Z'" :fill="item.color"
                                    opacity=".07" />
                            </svg>
                        </td>

                        <!-- Change Column -->
                        <td class="hide-sm">
                            <span class="change-chip"
                                :class="item.change > 0 ? 'up' : item.change < 0 ? 'down' : 'flat'">
                                {{ item.change > 0 ? '↑' : item.change < 0 ? '↓' : '—' }} {{ item.change !== 0 ?
                                    Math.abs(item.change) + '%' : 'N/A' }} </span>
                        </td>

                        <!-- Action Column -->
                        <td class="td-action">
                            <button class="row-btn" @click="$emit('details', item.id)">
                                বিস্তারিত
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>