<script setup>
/**
 * NoteEditView - Edit an existing note
 */
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostItStore } from '@/stores/postitStore'
import { validateNote } from '@/utils/validators'
import BaseButton from '@/components/common/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const store = usePostItStore()

const title = ref('')
const description = ref('')
const errors = ref([])
const isLoading = ref(true)

const note = computed(() => store.getNoteById(route.params.id))

onMounted(() => {
  if (note.value) {
    title.value = note.value.title
    description.value = note.value.description
    isLoading.value = false
  }
})

const handleSubmit = () => {
  errors.value = []

  const validation = validateNote(title.value, description.value)
  if (!validation.isValid) {
    errors.value = validation.errors
    return
  }

  const success = store.updateNote(route.params.id, title.value, description.value)
  if (success) {
    router.push({ name: 'note-detail', params: { id: route.params.id } })
  } else {
    errors.value = ['Failed to update note. Please try again.']
  }
}

const goBack = () => {
  router.push({ name: 'note-detail', params: { id: route.params.id } })
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
          Back to Note
        </button>
      </div>

      <!-- Edit Form -->
      <div v-if="!isLoading && note" class="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Edit Note</h1>

        <!-- Error Messages -->
        <div v-if="errors.length > 0" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 class="font-semibold text-red-800 mb-2">Please fix the following errors:</h3>
          <ul class="space-y-1">
            <li v-for="(error, index) in errors" :key="index" class="text-red-700 text-sm">• {{ error }}</li>
          </ul>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title Input -->
          <div>
            <label for="title" class="block text-sm font-semibold text-gray-700 mb-2"> Title </label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="Enter note title"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          <!-- Description Input -->
          <div>
            <label for="description" class="block text-sm font-semibold text-gray-700 mb-2"> Description </label>
            <textarea
              id="description"
              v-model="description"
              rows="12"
              placeholder="Enter note description"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-colors"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-4">
            <BaseButton variant="secondary" @click="goBack" class="cursor-pointer"> Cancel </BaseButton>
            <BaseButton variant="primary" type="submit" class="flex-1 flex items-center justify-center gap-2 cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </BaseButton>
          </div>
        </form>
      </div>

      <!-- Not Found -->
      <div v-else-if="!isLoading" class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-red-800 mb-2">Note Not Found</h2>
        <p class="text-red-700 mb-4">The note you're trying to edit doesn't exist or has been deleted.</p>
        <BaseButton variant="primary" @click="router.push({ name: 'home' })"> Go Home </BaseButton>
      </div>

      <!-- Loading -->
      <div v-else class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </main>
</template>
