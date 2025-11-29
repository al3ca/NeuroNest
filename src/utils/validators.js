/**
 * Input validation utilities
 */

/**
 * Check if a string is not empty after trimming
 * @param {string} value - The value to check
 * @returns {boolean} True if valid
 */
export const isNotEmpty = (value) => {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validate note title and description
 * @param {string} title - The note title
 * @param {string} description - The note description
 * @returns {object} Validation result with isValid and errors
 */
export const validateNote = (title, description) => {
  const errors = []

  if (!isNotEmpty(title)) {
    errors.push('Title is required and cannot be empty')
  }

  if (!isNotEmpty(description)) {
    errors.push('Description is required and cannot be empty')
  }

  if (title.length > 255) {
    errors.push('Title must be less than 255 characters')
  }

  if (description.length > 5000) {
    errors.push('Description must be less than 5000 characters')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
