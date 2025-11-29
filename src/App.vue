<script setup>
/**
 * App.vue - Root component
 * Provides layout structure for all pages
 */
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()

// Update page title based on route
watch(
  () => route.meta.title,
  (title) => {
    if (title) {
      document.title = `${title} | NeuroNest`
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <RouterView />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Ensure main content takes remaining space */
:deep(.flex-grow) {
  flex: 1;
}
</style>
