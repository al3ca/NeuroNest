/**
 * Composable for note management logic
 */
import { useRouter } from 'vue-router'
import { usePostItStore } from '@/stores/postitStore'

/**
 * Composable providing note CRUD operations
 * @returns {object} Note management functions
 */
export const useNoteActions = () => {
  const router = useRouter()
  const store = usePostItStore()

  /**
   * Create a new note
   * @param {string} title - Note title
   * @param {string} description - Note description
   * @returns {boolean} Success status
   */
  const createNote = (title, description) => {
    const note = store.addNote(title, description)
    return !!note
  }

  /**
   * Edit an existing note
   * @param {number} id - Note ID
   * @param {string} title - New title
   * @param {string} description - New description
   * @returns {boolean} Success status
   */
  const editNote = (id, title, description) => {
    return store.updateNote(id, title, description)
  }

  /**
   * Delete a note and navigate to home
   * @param {number} id - Note ID
   * @returns {Promise}
   */
  const deleteNoteAndNavigate = async (id) => {
    const deleted = store.deleteNote(id)
    if (deleted) {
      await router.push({ name: 'home' })
    }
    return deleted
  }

  /**
   * Get note details by ID
   * @param {number} id - Note ID
   * @returns {object|null} Note object or null
   */
  const getNoteDetails = (id) => {
    return store.getNoteById(id)
  }

  /**
   * Delete all notes with confirmation
   * @returns {boolean} Success status
   */
  const deleteAllNotesWithConfirmation = () => {
    if (confirm('Are you sure you want to delete all notes? This action cannot be undone.')) {
      return store.deleteAllNotes()
    }
    return false
  }

  /**
   * Delete a single note with confirmation
   * @param {number} id - Note ID
   * @returns {boolean|Promise} Success status or promise
   */
  const deleteSingleNoteWithConfirmation = (id) => {
    if (confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return deleteNoteAndNavigate(id)
    }
    return Promise.resolve(false)
  }

  return {
    createNote,
    editNote,
    deleteNoteAndNavigate,
    deleteSingleNoteWithConfirmation,
    deleteAllNotesWithConfirmation,
    getNoteDetails
  }
}
