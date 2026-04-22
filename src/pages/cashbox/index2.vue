<script setup lang="ts">
/**
 * Example: Settings page
 * Shows how any other page simply wraps its content in <DashboardLayout>.
 * The sidebar + header are handled automatically.
 */
definePageMeta({ layout: 'default' })
import DashboardLayout from "@/layout/default.vue"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref, computed } from 'vue'

// ── State ──────────────────────────────────────────────────────────────────
const activeTab = ref<'cashbox' | 'wallet' | 'tin' | 'menu'>('cashbox')
const showBalance = ref(true)

const stats = ref({
    todaySale: 12450,
    currentCash: 8320,
    todayReceived: 5600,
    todayPaid: 3200,
})

const cashboxItems = ref([
    {
        id: 'cash-sale',
        label: 'ক্যাশ বেচা',
        labelEn: 'Cash Sale',
        amount: 12450,
        type: 'income',
        icon: 'sale',
        color: '#27ae60',
        bg: '#e8f8f0',
    },
    {
        id: 'cash-buy',
        label: 'ক্যাশ কেনা',
        labelEn: 'Cash Purchase',
        amount: 4200,
        type: 'expense',
        icon: 'buy',
        color: '#e74c3c',
        bg: '#fdf0ef',
    },
    {
        id: 'expense',
        label: 'খরচ',
        labelEn: 'Expense',
        amount: 1850,
        type: 'expense',
        icon: 'expense',
        color: '#e74c3c',
        bg: '#fdf0ef',
    },
    {
        id: 'owner-gave',
        label: 'মালিক দিল',
        labelEn: 'Owner Gave',
        amount: 5000,
        type: 'income',
        icon: 'owner-in',
        color: '#27ae60',
        bg: '#e8f8f0',
    },
    {
        id: 'owner-took',
        label: 'মালিক নিল',
        labelEn: 'Owner Took',
        amount: 2300,
        type: 'expense',
        icon: 'owner-out',
        color: '#e74c3c',
        bg: '#fdf0ef',
    },
])

const fmt = (n: number) =>
    n.toLocaleString('bn-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const netBalance = computed(() => stats.value.todaySale - stats.value.todayPaid)
</script>

<template>
    <DashboardLayout>
        <!-- Optional: inject a page-specific button into the header -->

        <!-- Page content -->
        <div class="px-4 lg:px-6">
            <h1 class="text-2xl font-semibold mb-6">Cashbox</h1>
            <!-- your settings sections here -->
            <Card class="w-full">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            Sign Up
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div class="grid w-full items-center gap-4">
                            <div class="flex flex-col space-y-1.5">
                                <Label for="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" />
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <div class="flex items-center">
                                    <Label for="password">Password</Label>
                                    <a href="#" class="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter class="flex flex-col gap-2">
                    <Button class="w-full">
                        Login
                    </Button>
                    <Button variant="outline" class="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </DashboardLayout>
</template>