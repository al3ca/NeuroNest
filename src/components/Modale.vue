<script setup>

import { usePostItStore } from '@/stores/postitStore'
import { ref, onMounted, computed, watch } from 'vue'
const emit = defineEmits(['close'])

function closeModal() {
    emit('close')
}

const postIt = ref([])
const title = ref('')
const description = ref('')
const piniaStore = usePostItStore()

const addPostIt = () => {
    if (title.value.trim() === '' || description.value.trim() === '') {
        return
    }

    piniaStore.addPostIt({
        title: title.value,
        description: description.value,
        id: new Date().getTime(),
    })
    title.value = ''
    description.value = ''


    setTimeout(() => {
        closeModal()
    }, 0)

}

watch(postIt, newVal => {
    localStorage.setItem('postIt', JSON.stringify(newVal))
}, { deep: true })

</script>

<template>
    <form @submit.prevent="addPostIt">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="rounded-lg hover:shadow-xl/30 transition-shadow duration-400 w-full max-w-md p-6 bg-gray-100">
                <h2 class="text-xl font-semibold mb-4">New Post-it</h2>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input v-model="title" type="text"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea v-model="description" rows="6"
                        class="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div class="flex justify-end space-x-3">
                    <button @click="closeModal"
                        class="px-4 py-2 bg-gray-300 cursor-pointer rounded-xl hover:bg-gray-400 hover:shadow-xl transition-shadow duration-400">
                        Cancel
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-600 cursor-pointer hover:shadow-xl transition-shadow duration-400">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </form>

</template>
