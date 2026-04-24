<script setup>
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
    <Dialog>
        <!-- Trigger comes from SLOT -->
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>

        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Cash Credit</DialogTitle>
                <DialogDescription>
                    Current Cash
                </DialogDescription>
            </DialogHeader>

            <form class="grid gap-4">
                <div class="grid gap-3">
                    <Label for="cash">Cash</Label>
                    <Input id="cash" name="cash" default-value="Cash add" />
                </div>

                <div class="grid gap-3">
                    <Label for="description">Description</Label>
                    <Input id="description" name="description" default-value="Description" />
                </div>

                <DialogFooter>
                    <DialogClose as-child>
                        <button class="border px-3 py-1 rounded cursor-pointer">
                            Cancel
                        </button>
                    </DialogClose>

                    <button type="submit" class="bg-primary text-white cursor-pointer px-3 py-1 rounded">
                        Save changes
                    </button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>