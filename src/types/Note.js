/**
 * Note type definitions and factory functions
 */

/**
 * Create a new note object
 * @param {string} title - Note title
 * @param {string} description - Note description
 * @returns {object} Note object
 */
export const createNote = (title, description) => {
  const now = Date.now()
  return {
    id: now,
    title,
    description,
    createdAt: now,
    updatedAt: null
  }
}

/**
 * Update a note object
 * @param {object} note - Original note
 * @param {string} title - New title
 * @param {string} description - New description
 * @returns {object} Updated note object
 */
export const updateNote = (note, title, description) => {
  return {
    ...note,
    title,
    description,
    updatedAt: Date.now()
  }
}

/**
 * Type definition for Note
 * @typedef {Object} Note
 * @property {number} id - Unique identifier
 * @property {string} title - Note title
 * @property {string} description - Note description
 * @property {number} createdAt - Creation timestamp
 * @property {number|null} updatedAt - Last update timestamp
 */
