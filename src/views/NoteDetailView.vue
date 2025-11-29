<script setup>
/**
 * NoteDetailView - Display a single note in read-only mode
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostItStore } from '@/stores/postitStore'
import { useNoteActions } from '@/composables/useNoteActions'
import { formatDate } from '@/utils/dateFormatter'
import BaseButton from '@/components/common/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const store = usePostItStore()
const { deleteNoteAndNavigate } = useNoteActions()

const note = computed(() => store.getNoteById(route.params.id))

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
    await deleteNoteAndNavigate(route.params.id)
  }
}

const goBack = () => {
  router.push({ name: 'home' })
}

const goToEdit = () => {
  router.push({ 
    name: 'note-edit', 
    params: { id: note.value.id } 
  })
}
</script>

<template>
  <main class="flex-grow">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Back Button -->
      <div class="mb-6">
        <button
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
          @click="goBack"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Notes
        </button>
      </div>

      <!-- Note Display -->
      <div v-if="note" class="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-md p-6 sm:p-8">
        <!-- Header with Actions -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-yellow-200">
          <div class="flex-1">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{{ note.title }}</h1>
            <div class="flex flex-col gap-1 text-sm text-gray-600">
              <div>
                <span class="font-semibold">Created:</span>
                {{ formatDate(note.createdAt) }}
              </div>
              <div v-if="note.updatedAt">
                <span class="font-semibold">Last updated:</span>
                {{ formatDate(note.updatedAt) }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 w-full sm:w-auto">
            <BaseButton variant="primary" size="md" @click="goToEdit" class="flex-1 sm:flex-none flex items-center justify-center gap-2 cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-4l6-6m0 0l2 2m-2-2v2" />
              </svg>
              Edit
            </BaseButton>
            <BaseButton variant="danger" size="md" @click="handleDelete" class="flex-1 sm:flex-none flex items-center justify-center gap-2 cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </BaseButton>
          </div>
        </div>

        <!-- Content -->
        <div class="prose prose-sm max-w-none">
          <p class="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed">{{ note.description }}</p>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-red-800 mb-2">Note Not Found</h2>
        <p class="text-red-700 mb-4">The note you're looking for doesn't exist or has been deleted.</p>
        <BaseButton variant="primary" @click="goBack"> Go Back </BaseButton>
      </div>
    </div>
  </main>
</template>
