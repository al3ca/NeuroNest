/**
 * Composable for managing modal states
 */
import { ref } from 'vue'

/**
 * Composable for modal management
 * @returns {object} Modal state and control functions
 */
export const useModal = () => {
  const isOpen = ref(false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    open,
    close,
    toggle
  }
}
