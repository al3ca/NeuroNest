<script setup>
/**
 * CreateNoteModal - Modal for creating new notes
 */
import { ref } from 'vue'
import { usePostItStore } from '@/stores/postitStore'
import { validateNote } from '@/utils/validators'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const emit = defineEmits(['close'])

const store = usePostItStore()
const title = ref('')
const description = ref('')
const errors = ref([])
const isSubmitting = ref(false)

const handleSubmit = async () => {
  errors.value = []

  const validation = validateNote(title.value, description.value)
  if (!validation.isValid) {
    errors.value = validation.errors
    return
  }

  isSubmitting.value = true
  try {
    const note = store.addNote(title.value, description.value)
    if (note) {
      title.value = ''
      description.value = ''
      emit('close')
    } else {
      errors.value = ['Failed to create note. Please try again.']
    }
  } finally {
    isSubmitting.value = false
  }
}

const handleClose = () => {
  if (!isSubmitting.value) {
    title.value = ''
    description.value = ''
    errors.value = []
    emit('close')
  }
}
</script>

<template>
  <BaseModal title="Create New Note" size="md" @close="handleClose">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Error Messages -->
      <div v-if="errors.length > 0" class="p-3 bg-red-50 border border-red-200 rounded-lg">
        <h4 class="font-semibold text-red-800 text-sm mb-1">Errors:</h4>
        <ul class="space-y-1">
          <li v-for="(error, index) in errors" :key="index" class="text-red-700 text-sm">• {{ error }}</li>
        </ul>
      </div>

      <!-- Title Input -->
      <div>
        <label for="note-title" class="block text-sm font-semibold text-gray-700 mb-1"> Title </label>
        <input
          id="note-title"
          v-model="title"
          type="text"
          placeholder="Enter note title"
          autofocus
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
        />
      </div>

      <!-- Description Input -->
      <div>
        <label for="note-description" class="block text-sm font-semibold text-gray-700 mb-1"> Description </label>
        <textarea
          id="note-description"
          v-model="description"
          rows="5"
          placeholder="Enter note description"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-colors"
        ></textarea>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 pt-4 border-t border-gray-200">
        <BaseButton variant="secondary" :disabled="isSubmitting" @click="handleClose"> Cancel </BaseButton>
        <BaseButton variant="primary" type="submit" :disabled="isSubmitting" class="flex-1">
          {{ isSubmitting ? 'Creating...' : 'Create Note' }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
