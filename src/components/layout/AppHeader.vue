<script setup>
/**
 * AppHeader - Application header component
 * Displays branding and main navigation
 */
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Brand -->
        <button
          class="flex items-center gap-2 text-white hover:opacity-90 transition-opacity group"
          @click="goHome"
          aria-label="Go to home page"
        >
          <!-- Icon -->
          <div class="bg-white/20 group-hover:bg-white/30 rounded-lg p-2 transition-colors">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          </div>

          <!-- Brand Name -->
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-white">NeuroNest</h1>
            <p class="text-xs text-blue-100 hidden sm:block">Smart Note Taking</p>
          </div>
        </button>

        <!-- Description (visible on larger screens) -->
        <p class="hidden md:block text-blue-100 text-sm italic">Your personal space to remember everything</p>

        <!-- Right side actions (can be extended) -->
        <div class="flex items-center gap-2">
          <!-- Add more header actions here if needed -->
        </div>
      </div>
    </nav>
  </header>
</template>
