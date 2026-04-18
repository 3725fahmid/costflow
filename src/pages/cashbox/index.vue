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