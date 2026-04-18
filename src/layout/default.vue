<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue"
import SiteHeader from "@/components/SiteHeader.vue"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

/**
 * DashboardLayout
 *
 * Wraps every dashboard page with the shared sidebar + header shell.
 * Use the default slot to inject page-specific content.
 *
 * Usage:
 *   <DashboardLayout>
 *     <YourPageContent />
 *   </DashboardLayout>
 *
 * Named slots:
 *   #header-actions  → Extra buttons/controls injected into the SiteHeader area
 */
</script>

<template>
  <SidebarProvider :style="{
    '--sidebar-width': 'calc(var(--spacing) * 72)',
    '--header-height': 'calc(var(--spacing) * 12)',
  }">
    <AppSidebar variant="inset" />

    <SidebarInset>
      <!-- ── Site Header ─────────────────────────────────────────── -->
      <SiteHeader>
        <!-- Optional: pages can push extra controls into the header -->
        <template v-if="$slots['header-actions']" #actions>
          <slot name="header-actions" />
        </template>
      </SiteHeader>

      <!-- ── Page Content ───────────────────────────────────────── -->
      <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
          <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <!--
                            Default slot — inject any page content here.
                            Each page is responsible for its own padding/layout
                            inside this container.
                        -->
            <slot />
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>