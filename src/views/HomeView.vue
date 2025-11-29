<script setup>
/**
 * HomeView - Main page displaying all notes
 */
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePostItStore } from '@/stores/postitStore'
import { useModal } from '@/composables/useModal'
import { useNoteActions } from '@/composables/useNoteActions'
import NoteCard from '@/components/common/NoteCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CreateNoteModal from '@/components/modals/CreateNoteModal.vue'
import DeleteAllModal from '@/components/modals/DeleteAllModal.vue'

const router = useRouter()
const store = usePostItStore()
const { isOpen: showCreateModal, open: openCreate, close: closeCreate } = useModal()
const { isOpen: showDeleteModal, open: openDelete, close: closeDelete } = useModal()
const { deleteAllNotesWithConfirmation } = useNoteActions()

const notes = computed(() => store.sortedNotes)
const isEmpty = computed(() => store.notesCount === 0)

const handleDeleteAll = () => {
  if (deleteAllNotesWithConfirmation()) {
    closeDelete()
  }
}

const handleNoteAction = async (action, id) => {
  if (action === 'view') {
    await router.push({ name: 'note-detail', params: { id } })
  } else if (action === 'edit') {
    await router.push({ name: 'note-edit', params: { id } })
  } else if (action === 'delete') {
    if (confirm('Delete this note?')) {
      store.deleteNote(id)
    }
  }
}
</script>

<template>
  <main class="flex-grow">
    <!-- Controls Section -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start items-stretch sm:items-center">
          <BaseButton variant="primary" size="md" @click="openCreate" class="flex items-center justify-center gap-2 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Post-It
          </BaseButton>
          <BaseButton v-if="!isEmpty" variant="danger" size="md" @click="openDelete" class="flex items-center justify-center gap-2 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete All
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Notes</h2>
        <p class="text-gray-600">{{ store.notesCount }} note{{ store.notesCount !== 1 ? 's' : '' }} saved</p>
      </div>

      <!-- Empty State -->
      <div v-if="isEmpty" class="bg-white rounded-lg shadow-sm p-8 sm:p-12">
        <EmptyState
          title="No notes yet"
          description="Create your first note to get started. Your notes are automatically saved."
        />
      </div>

      <!-- Notes Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @view="handleNoteAction('view', note.id)"
          @edit="handleNoteAction('edit', note.id)"
          @delete="handleNoteAction('delete', note.id)"
        />
      </div>
    </div>

    <!-- Modals -->
    <CreateNoteModal v-if="showCreateModal" @close="closeCreate" />
    <DeleteAllModal v-if="showDeleteModal" @confirm="handleDeleteAll" @close="closeDelete" />
  </main>
</template>
