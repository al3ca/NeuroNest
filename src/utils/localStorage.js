/**
 * LocalStorage utilities with error handling
 */

const STORAGE_KEY = 'neuronest_notes'

/**
 * Get all notes from localStorage
 * @returns {array} Array of notes
 */
export const getNotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

/**
 * Save notes to localStorage
 * @param {array} notes - Array of notes to save
 * @returns {boolean} Success status
 */
export const saveNotes = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    return true
  } catch (error) {
    console.error('Error writing to localStorage:', error)
    return false
  }
}

/**
 * Clear all notes from localStorage
 * @returns {boolean} Success status
 */
export const clearNotes = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
}
