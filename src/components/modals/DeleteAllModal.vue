<script setup>
/**
 * DeleteAllModal - Confirmation modal for deleting all notes
 */
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'

defineEmits(['confirm', 'close'])
</script>

<template>
  <BaseModal title="Delete All Notes" size="sm" @close="$emit('close')">
    <div class="space-y-4">
      <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 class="font-semibold text-yellow-800 mb-2">Warning</h3>
        <p class="text-yellow-700 text-sm">
          Are you sure you want to delete <strong>all notes</strong>? This action is permanent and cannot be undone.
        </p>
      </div>

      <div class="flex gap-2 pt-2">
        <BaseButton variant="secondary" class="flex-1" @click="$emit('close')"> Cancel </BaseButton>
        <BaseButton variant="danger" class="flex-1" @click="$emit('confirm')"> Delete All </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
