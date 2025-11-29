/**
 * Application constants
 */

export const APP_NAME = 'NeuroNest'
export const APP_DESCRIPTION = 'Your personal space to remember everything'

export const MODAL_TYPES = {
  CREATE_NOTE: 'create-note',
  DELETE_ALL: 'delete-all',
  CONFIRM_DELETE: 'confirm-delete'
}

export const ROUTE_NAMES = {
  HOME: 'home',
  NOTE_DETAIL: 'note-detail',
  NOTE_EDIT: 'note-edit'
}

export const STORAGE_KEYS = {
  NOTES: 'neuronest_notes'
}

export const VALIDATION = {
  MAX_TITLE_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_TITLE_LENGTH: 1,
  MIN_DESCRIPTION_LENGTH: 1
}

export const UI = {
  COLORS: {
    PRIMARY: 'blue',
    WARNING: 'red',
    SUCCESS: 'green',
    INFO: 'yellow'
  },
  TRANSITIONS: {
    SHORT: '200ms',
    MEDIUM: '400ms',
    LONG: '600ms'
  }
}
