<script setup>
import { usePostItStore } from '@/stores/postitStore'
import { ref } from 'vue'
const emit = defineEmits(['close', 'confirm'])
const piniaStore = usePostItStore()

function handleClick() {
    emit('open-create')
}

function handleClickDelete() {
    emit('open-delete')
}

function closeModal() {
    emit('close')
}

function confirmDelete() {
    piniaStore.deletePostit()
    closeModal()
}

</script>

<template>
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-gray-100 rounded-lg hover:shadow-xl/30 transition-shadow duration-400 w-full max-w-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-red-600">Confirm deletion</h2>
            <p class="text-gray-700 mb-6">Do you really want to delete all the post-its? This action is irreversible.
            </p>

            <div class="flex justify-end space-x-3">
                <button @click="closeModal"
                    class="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 hover:shadow-xl transition-shadow duration-400">
                    Cancel
                </button>
                <button @click="confirmDelete"
                    class="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 hover:shadow-xl transition-shadow duration-400">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
