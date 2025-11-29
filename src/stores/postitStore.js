import { defineStore } from 'pinia'
import { getNotes, saveNotes, clearNotes } from '@/utils/localStorage'
import { createNote, updateNote } from '@/types/Note'

/**
 * PostIt Store - Manages all note-related state and actions
 * Uses localStorage for persistence
 */
export const usePostItStore = defineStore('postItStore', {
  state: () => ({
    notes: getNotes()
  }),

  getters: {
    /**
     * Get all notes sorted by most recently updated
     * @returns {array} Sorted notes array
     */
    sortedNotes: (state) => {
      return [...state.notes].sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt
        const dateB = b.updatedAt || b.createdAt
        return dateB - dateA
      })
    },

    /**
     * Get total count of notes
     * @returns {number} Notes count
     */
    notesCount: (state) => state.notes.length,

    /**
     * Check if there are any notes
     * @returns {boolean} True if notes exist
     */
    hasNotes: (state) => state.notes.length > 0,

    /**
     * Get note by ID
     * @param {function} find notes by id
     * @returns {object|null} Note object or null
     */
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === parseInt(id)) || null
    }
  },

  actions: {
    /**
     * Add a new note
     * @param {string} title - Note title
     * @param {string} description - Note description
     * @returns {object|null} Created note or null on error
     */
    addNote(title, description) {
      try {
        const note = createNote(title, description)
        this.notes.push(note)
        this._persistToStorage()
        return note
      } catch (error) {
        console.error('Error adding note:', error)
        return null
      }
    },

    /**
     * Update an existing note
     * @param {number} id - Note ID
     * @param {string} title - New title
     * @param {string} description - New description
     * @returns {boolean} Success status
     */
    updateNote(id, title, description) {
      try {
        const index = this.notes.findIndex((note) => note.id === parseInt(id))
        if (index === -1) {
          console.warn(`Note with id ${id} not found`)
          return false
        }

        this.notes[index] = updateNote(this.notes[index], title, description)
        this._persistToStorage()
        return true
      } catch (error) {
        console.error('Error updating note:', error)
        return false
      }
    },

    /**
     * Delete a note by ID
     * @param {number} id - Note ID
     * @returns {boolean} Success status
     */
    deleteNote(id) {
      try {
        const index = this.notes.findIndex((note) => note.id === parseInt(id))
        if (index === -1) {
          console.warn(`Note with id ${id} not found`)
          return false
        }

        this.notes.splice(index, 1)
        this._persistToStorage()
        return true
      } catch (error) {
        console.error('Error deleting note:', error)
        return false
      }
    },

    /**
     * Delete all notes
     * @returns {boolean} Success status
     */
    deleteAllNotes() {
      try {
        this.notes = []
        const success = clearNotes()
        if (!success) {
          console.error('Failed to clear localStorage')
          // Still clear the state even if localStorage fails
        }
        return true
      } catch (error) {
        console.error('Error deleting all notes:', error)
        return false
      }
    },

    /**
     * Search notes by title or description
     * @param {string} query - Search query
     * @returns {array} Filtered notes
     */
    searchNotes(query) {
      const lowerQuery = query.toLowerCase()
      return this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerQuery) ||
          note.description.toLowerCase().includes(lowerQuery)
      )
    },

    /**
     * Internal method to persist notes to localStorage
     * @private
     */
    _persistToStorage() {
      const success = saveNotes(this.notes)
      if (!success) {
        console.error('Failed to persist notes to localStorage')
      }
    }
  }
})
