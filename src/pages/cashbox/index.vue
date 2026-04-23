<script lang="ts">
definePageMeta({ layout: 'default' })
export const iframeHeight = "800px"
export const description = "Cashbox dashboard page inspired by mobile cashbox app."
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DashboardLayout from "@/layout/default.vue"
import BalanceSectionCards from "@/components/BalanceSectionCards.vue"
import CashboxHeader from "@/components/CashboxHeader.vue"
// ── State ──────────────────────────────────────────────────────────────────
const showBalance = ref(true)
const selectedPeriod = ref<'today' | 'week' | 'month'>('today')

const stats = ref({
    todaySale: 124500,
    currentCash: 83200,
    todayReceived: 56000,
    todayPaid: 32000,
    dueCollection: 4800,
    paymentGiven: 2100,
})

const cashboxItems = ref([
    {
        id: 'cash-sale',
        label: 'ক্যাশ বেচা',
        labelEn: 'Cash Sale',
        amount: 124500,
        change: +8.4,
        type: 'income',
        color: '#16a34a',
        bg: '#f0fdf4',
        borderColor: '#bbf7d0',
    },
    {
        id: 'cash-buy',
        label: 'ক্যাশ কেনা',
        labelEn: 'Cash Purchase',
        amount: 42000,
        change: -2.1,
        type: 'expense',
        color: '#dc2626',
        bg: '#fef2f2',
        borderColor: '#fecaca',
    },
    {
        id: 'expense',
        label: 'খরচ',
        labelEn: 'Expense',
        amount: 18500,
        change: +1.2,
        type: 'expense',
        color: '#dc2626',
        bg: '#fef2f2',
        borderColor: '#fecaca',
    },
    {
        id: 'owner-gave',
        label: 'মালিক দিল',
        labelEn: 'Owner Gave',
        amount: 50000,
        change: 0,
        type: 'income',
        color: '#16a34a',
        bg: '#f0fdf4',
        borderColor: '#bbf7d0',
    },
    {
        id: 'owner-took',
        label: 'মালিক নিল',
        labelEn: 'Owner Took',
        amount: 23000,
        change: -5.3,
        type: 'expense',
        color: '#dc2626',
        bg: '#fef2f2',
        borderColor: '#fecaca',
    },
])

const sparkData: Record<string, number[]> = {
    'cash-sale': [60, 75, 55, 90, 80, 95, 100],
    'cash-buy': [40, 55, 45, 60, 50, 42, 40],
    'expense': [30, 28, 35, 25, 32, 20, 18],
    'owner-gave': [0, 0, 50, 0, 0, 50, 50],
    'owner-took': [20, 30, 25, 35, 28, 24, 23],
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

const fmt = (n: number) =>
    new Intl.NumberFormat('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

const fmtShort = (n: number) => {
    if (n >= 100000) return (n / 100000).toFixed(1) + 'L'
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
    return n.toString()
}

const netFlow = computed(() => stats.value.todayReceived - stats.value.todayPaid)

// ... rest of your existing state (stats, cashboxItems, sparkData, netFlow) ...

const handlePeriodChange = (period: 'today' | 'week' | 'month') => {
    selectedPeriod.value = period
    // Load data for selected period
}

const toggleBalance = (value: boolean) => {
    showBalance.value = value
}
</script>

<template>
    <DashboardLayout>
        <!-- ══════════════════════════════════════════════════
       PAGE HEADER
  ══════════════════════════════════════════════════ -->
        <!-- Header -->
        <CashboxHeader :selected-period="selectedPeriod" :show-balance="showBalance"
            @update:selectedPeriod="handlePeriodChange" @update:showBalance="toggleBalance" />

        <!-- ══════════════════════════════════════════════════
        balance Card
  ══════════════════════════════════════════════════ -->
        <!-- Cards -->
        <BalanceSectionCards :stats="stats" :show-balance="showBalance" :net-flow="netFlow" />
        <div class="cb-page">


            <!-- ══════════════════════════════════════════════════
           SUMMARY STAT CARDS
      ══════════════════════════════════════════════════ -->

            <!-- ══════════════════════════════════════════════════
           CASHBOX ITEMS TABLE
      ══════════════════════════════════════════════════ -->
            <div class="cb-section">
                <div class="cb-section-header">
                    <h2 class="cb-section-title">লেনদেনের বিবরণ <span>Transaction Details</span></h2>
                    <button class="view-all-btn">সব দেখুন →</button>
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
                            <tr v-for="(item, idx) in cashboxItems" :key="item.id" class="cb-row"
                                :style="{ animationDelay: idx * 0.06 + 's' }">
                                <td class="td-category">
                                    <div class="cat-icon"
                                        :style="{ background: item.bg, borderColor: item.borderColor }">
                                        <svg v-if="item.id === 'cash-sale'" width="18" height="18" viewBox="0 0 24 24"
                                            fill="none" :stroke="item.color" stroke-width="2">
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                            <path d="M8 12l3 3 5-5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <svg v-else-if="item.id === 'cash-buy'" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" :stroke="item.color" stroke-width="2">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <line x1="3" y1="6" x2="21" y2="6" />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                        <svg v-else-if="item.id === 'expense'" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" :stroke="item.color" stroke-width="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        <svg v-else-if="item.id === 'owner-gave'" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" :stroke="item.color" stroke-width="2">
                                            <path d="M20 12V22H4V12" />
                                            <path d="M22 7H2v5h20V7z" />
                                            <path d="M12 22V7" />
                                            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                                            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                                        </svg>
                                        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            :stroke="item.color" stroke-width="2">
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

                                <td class="hide-sm">
                                    <span class="type-badge" :class="item.type">
                                        {{ item.type === 'income' ? 'আয়' : 'ব্যয়' }}
                                    </span>
                                </td>

                                <td class="td-amount">
                                    <span class="amount-val" :class="item.type">
                                        {{ item.type === 'income' ? '+' : '−' }}{{ showBalance ? fmt(item.amount) :
                                            '••••••' }}
                                    </span>
                                    <span class="amount-short">{{ fmtShort(item.amount) }}</span>
                                </td>

                                <td class="hide-md td-spark">
                                    <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
                                        <path :d="sparkPath(sparkData[item.id])" :stroke="item.color" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".8" />
                                        <path :d="sparkPath(sparkData[item.id]) + ' L80,32 L0,32 Z'" :fill="item.color"
                                            opacity=".07" />
                                    </svg>
                                </td>

                                <td class="hide-sm">
                                    <span class="change-chip"
                                        :class="item.change > 0 ? 'up' : item.change < 0 ? 'down' : 'flat'">
                                        {{ item.change > 0 ? '↑' : item.change < 0 ? '↓' : '—' }} {{ item.change !== 0 ?
                                            Math.abs(item.change) + '%' : 'N/A' }} </span>
                                </td>

                                <td class="td-action">
                                    <button class="row-btn">বিস্তারিত</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ══════════════════════════════════════════════════
           FOOTER STRIP
      ══════════════════════════════════════════════════ -->
            <div class="cb-footer-strip">
                <div class="footer-pill income">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                    </svg>
                    বাকি আদায়:&nbsp;<strong>{{ showBalance ? fmt(stats.dueCollection) : '••••' }}</strong>
                </div>
                <div class="footer-pill expense">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                        <polyline points="17 18 23 18 23 12" />
                    </svg>
                    পেমেন্ট দেয়া:&nbsp;<strong>{{ showBalance ? fmt(stats.paymentGiven) : '••••' }}</strong>
                </div>
                <div class="footer-pill neutral">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    সর্বশেষ আপডেট: এইমাত্র
                </div>
            </div>

        </div>
    </DashboardLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap');

.cb-page {
    --green: #16a34a;
    --red: #dc2626;
    --orange: #ea580c;
    --amber: #d97706;
    --blue: #2563eb;
    --bg: #f8f7f4;
    --card: #ffffff;
    --border: #e8e4de;
    --text: #1c1917;
    --muted: #78716c;
    --light: #f5f4f1;

    font-family: 'Hind Siliguri', 'Sora', sans-serif;
    padding: 28px 32px 48px;
    min-height: 100%;
}

/* ── Header ── */
.cb-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
}

.cb-title {
    font-size: 26px;
    font-weight: 800;
    color: var(--text);
    font-family: 'Sora', sans-serif;
    letter-spacing: -0.6px;
    margin: 0 0 4px;
    line-height: 1.2;
}

.cb-title-en {
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
}

.cb-subtitle {
    font-size: 13.5px;
    color: var(--muted);
    margin: 0;
}

.cb-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.period-tabs {
    display: flex;
    background: var(--light);
    border-radius: 10px;
    padding: 3px;
    border: 1px solid var(--border);
    gap: 2px;
}

.period-tab {
    padding: 6px 16px;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    cursor: pointer;
    transition: all .18s;
    font-family: 'Hind Siliguri', sans-serif;
    white-space: nowrap;
}

.period-tab.active {
    background: #fff;
    color: var(--text);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
}

.cb-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    border-radius: 10px;
    padding: 9px 18px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
    font-family: 'Hind Siliguri', sans-serif;
    white-space: nowrap;
}

.cb-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, .12);
}

.cb-btn:active {
    transform: scale(.97);
}

.cb-btn.primary {
    background: var(--text);
    color: #fff;
}

.cb-btn.secondary {
    background: #eaf7ee;
    color: var(--green);
    border: 1px solid #bbf7d0;
}

.cb-btn.icon-only {
    background: var(--light);
    color: var(--muted);
    padding: 9px 11px;
    border: 1px solid var(--border);
}

/* ── Stat Grid ── */
.stat-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
    margin-bottom: 24px;
}

@media (max-width: 1280px) {
    .stat-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .stat-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 420px) {
    .stat-grid {
        grid-template-columns: 1fr;
    }
}

.stat-card {
    background: var(--card);
    border-radius: 16px;
    padding: 18px 18px 16px;
    border: 1px solid var(--border);
    box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
    transition: transform .2s, box-shadow .2s;
    animation: fadeUp .4s ease both;
}

.stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 26px rgba(0, 0, 0, .09);
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(14px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
}

.stat-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.stat-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 20px;
    font-family: 'Sora', sans-serif;
    white-space: nowrap;
}

.stat-badge.up {
    background: #dcfce7;
    color: var(--green);
}

.stat-badge.down {
    background: #fee2e2;
    color: var(--red);
}

.stat-badge.warn {
    background: #ffedd5;
    color: var(--orange);
}

.stat-value {
    font-size: 19px;
    font-weight: 800;
    color: var(--text);
    font-family: 'Sora', sans-serif;
    letter-spacing: -.5px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color .3s;
}

.stat-label {
    font-size: 12.5px;
    color: var(--muted);
    line-height: 1.4;
}

.stat-label em {
    display: block;
    font-style: normal;
    font-size: 11px;
    color: #a8a29e;
    font-family: 'Sora', sans-serif;
}

/* ── Section ── */
.cb-section {
    background: var(--card);
    border-radius: 18px;
    border: 1px solid var(--border);
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
}

.cb-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px 14px;
    border-bottom: 1px solid var(--border);
}

.cb-section-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    margin: 0;
    font-family: 'Sora', sans-serif;
}

.cb-section-title span {
    font-size: 12px;
    color: var(--muted);
    font-weight: 400;
    margin-left: 6px;
}

.view-all-btn {
    font-size: 13px;
    color: var(--blue);
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-family: 'Hind Siliguri', sans-serif;
    padding: 0;
}

.view-all-btn:hover {
    text-decoration: underline;
}

/* ── Table ── */
.cb-table-wrap {
    overflow-x: auto;
}

.cb-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Hind Siliguri', sans-serif;
}

.cb-table thead tr {
    background: #faf9f7;
    border-bottom: 1px solid var(--border);
}

.cb-table th {
    padding: 12px 22px;
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    text-align: left;
    white-space: nowrap;
    letter-spacing: .04em;
    font-family: 'Sora', sans-serif;
}

.cb-row {
    border-bottom: 1px solid #f5f4f1;
    transition: background .15s;
    cursor: pointer;
    animation: rowIn .38s ease both;
}

.cb-row:last-child {
    border-bottom: none;
}

.cb-row:hover {
    background: #faf9f7;
}

@keyframes rowIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.cb-table td {
    padding: 15px 22px;
    vertical-align: middle;
}

.td-category {
    display: flex;
    align-items: center;
    gap: 13px;
}

.cat-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1.5px solid;
}

.cat-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.cat-name {
    font-size: 14.5px;
    font-weight: 600;
    color: var(--text);
}

.cat-sub {
    font-size: 11px;
    color: #a8a29e;
    font-family: 'Sora', sans-serif;
}

.type-badge {
    display: inline-flex;
    padding: 4px 11px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
}

.type-badge.income {
    background: #dcfce7;
    color: var(--green);
}

.type-badge.expense {
    background: #fee2e2;
    color: var(--red);
}

.td-amount {
    min-width: 140px;
}

.amount-val {
    display: block;
    font-size: 14.5px;
    font-weight: 700;
    font-family: 'Sora', sans-serif;
    letter-spacing: -.3px;
    transition: all .3s;
}

.amount-val.income {
    color: var(--green);
}

.amount-val.expense {
    color: var(--red);
}

.amount-short {
    font-size: 11px;
    color: #a8a29e;
    font-family: 'Sora', sans-serif;
}

.td-spark {
    width: 100px;
}

.change-chip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Sora', sans-serif;
}

.change-chip.up {
    background: #dcfce7;
    color: var(--green);
}

.change-chip.down {
    background: #fee2e2;
    color: var(--red);
}

.change-chip.flat {
    background: #f3f4f6;
    color: #9ca3af;
}

.td-action {
    text-align: right;
}

.row-btn {
    padding: 7px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--light);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--muted);
    cursor: pointer;
    font-family: 'Hind Siliguri', sans-serif;
    transition: all .15s;
    white-space: nowrap;
}

.row-btn:hover {
    background: var(--text);
    color: #fff;
    border-color: var(--text);
}

@media (max-width: 960px) {
    .hide-md {
        display: none !important;
    }
}

@media (max-width: 640px) {
    .hide-sm {
        display: none !important;
    }
}

/* ── Footer Strip ── */
.cb-footer-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
}

.footer-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 40px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Hind Siliguri', sans-serif;
}

.footer-pill strong {
    font-family: 'Sora', sans-serif;
}

.footer-pill.income {
    background: #f0fdf4;
    color: var(--green);
    border: 1px solid #bbf7d0;
}

.footer-pill.expense {
    background: #fef2f2;
    color: var(--red);
    border: 1px solid #fecaca;
}

.footer-pill.neutral {
    background: var(--light);
    color: var(--muted);
    border: 1px solid var(--border);
}

/* ── Responsive padding ── */
@media (max-width: 768px) {
    .cb-page {
        padding: 18px 16px 36px;
    }

    .cb-title {
        font-size: 20px;
    }
}
</style>