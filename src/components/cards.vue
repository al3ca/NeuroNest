<script setup>
import { usePostItStore } from '@/stores/postitStore'
import listPostIt from "@/components/listPostIt.vue"


const emit = defineEmits(['open-create', 'open-delete'])
const piniaStore = usePostItStore()

function handleClick() {
    emit('open-create')
}

function handleClickDelete() {
    emit('open-delete')
}

</script>

<template>
    <div class="flex justify-center items-center p-5 space-x-4">
        <button @click="handleClick"
            class="px-3 py-1 md:px-6 md:py-3 cursor-pointer border-5 border-double border-blue-800 bg-blue-400 text-white rounded-xl shadow hover:bg-blue-600 hover:shadow-xl/30 transition-shadow duration-400">
            New Post-It
        </button>
        <button @click="handleClickDelete"
            class="px-3 py-1 md:px-6 md:py-3 cursor-pointer border-5 border-double border-red-800 bg-red-400 text-white rounded-xl shadow hover:bg-red-600 hover:shadow-xl/30 transition-shadow duration-400">
            Delete All 
        </button>
    </div>

    <div id="postItLs">
        <h2 class="text-center py-2 text-2xl md:text-3xl bold">My Post-Its</h2>
    </div>

    <div>
        <listPostIt />
    </div>
</template>
