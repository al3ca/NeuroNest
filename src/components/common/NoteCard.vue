<script setup>
/**
 * NoteCard - Reusable note card component for displaying notes in grid
 */
import { formatDate, getRelativeTime } from '@/utils/dateFormatter'

defineProps({
  note: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        typeof value.id === 'number' &&
        typeof value.title === 'string' &&
        typeof value.description === 'string' &&
        typeof value.createdAt === 'number'
      )
    }
  }
})

const emit = defineEmits(['view', 'edit', 'delete'])
</script>

<template>
  <div
    class="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow hover:shadow-lg p-4 transition-all duration-300 hover:bg-yellow-100 flex flex-col h-full"
  >
    <!-- Title -->
    <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{{ note.title }}</h3>

    <!-- Description Preview -->
    <p class="text-gray-700 mb-3 line-clamp-3 text-sm flex-grow">{{ note.description }}</p>

    <!-- Timestamps -->
    <div class="mb-3 text-xs text-gray-500 space-y-1">
      <div>
        <span class="font-semibold">Created:</span>
        {{ getRelativeTime(note.createdAt) }}
      </div>
      <div v-if="note.updatedAt">
        <span class="font-semibold">Updated:</span>
        {{ getRelativeTime(note.updatedAt) }}
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 pt-3 border-t border-yellow-300">
      <button
        class="flex-1 flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-2 py-1 transition-colors cursor-pointer"
        title="View note"
        @click="emit('view')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        View
      </button>
      <button
        class="flex-1 flex items-center justify-center gap-1 text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200 rounded px-2 py-1 transition-colors cursor-pointer"
        title="Edit note"
        @click="emit('edit')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7.5-1L14.5 3.5"
          />
        </svg>
        Edit
      </button>
      <button
        class="flex-1 flex items-center justify-center gap-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded px-2 py-1 transition-colors cursor-pointer"
        title="Delete note"
        @click="emit('delete')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </button>
    </div>
  </div>
</template>
