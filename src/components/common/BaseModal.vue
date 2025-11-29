<script setup>
/**
 * BaseModal - Reusable modal component
 * Provides backdrop and modal container with proper accessibility
 */
defineProps({
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['close'])

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg'
}

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" @click="handleBackdropClick">
    <div
      :class="[sizeClasses[size], 'w-full mx-4 rounded-lg shadow-2xl transition-all duration-300 bg-white']"
      role="dialog"
      aria-modal="true"
    >
      <div v-if="title" class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
        <button
          class="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
          @click="emit('close')"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="px-6 py-4">
        <slot />
      </div>
    </div>
  </div>
</template>
