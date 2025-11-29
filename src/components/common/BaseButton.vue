<script setup>
/**
 * BaseButton - Reusable button component
 * Supports multiple variants and sizes
 */
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white'
}

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const buttonVariant = variantClasses['primary']
const buttonSize = sizeClasses['md']
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      disabled && 'opacity-50 cursor-not-allowed',
      !disabled && 'cursor-pointer',
      'rounded-lg font-semibold transition-all duration-200 shadow hover:shadow-lg'
    ]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
