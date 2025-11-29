<script setup>
/**
 * AppFooter - Application footer component
 * Displays copyright and metadata
 */
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="bg-blue-50 text-blue-900 text-center py-6 mt-12 border-t border-blue-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm">
        © {{ currentYear }} <span class="font-semibold text-blue-700">NeuroNest</span> - Professional Note Taking App
      </p>
      <p class="text-xs text-blue-600 mt-1">Made with Vue.js 3 & Tailwind CSS</p>
    </div>
  </footer>
</template>
