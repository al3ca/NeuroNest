<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { usePostItStore } from '@/stores/postitStore'


const piniaStore = usePostItStore()
const router = useRouter()
const route = useRoute()
const id = route.params.id

const myTitle = ref('')
const myDesc = ref('')
const myId = ref(null)

onMounted(() => {
    const selected = piniaStore.getPostItById(id)
    if (selected) {
        myTitle.value = selected.title
        myDesc.value = selected.description
        myId.value = selected.id
    }
})

const updater = () => {
    if (myTitle.value.trim() === '' || myDesc.value.trim() === '') {
        return
    }

    piniaStore.updatePostIt({
        id: myId.value,
        title: myTitle.value,
        description: myDesc.value,
        update: new Date().getTime()
    })

    myTitle.value = ''
    myDesc.value = ''
    router.push(`/note/${myId.value}`)
}
</script>

<template>
    <main class="flex-grow p-5">
        <div class="w-full md:w-[75%] mx-auto mb-6">
            <router-link :to="`/`"
                class="inline-flex items-center text-gray-600 text-sm italic hover:text-blue-600 transition">
                ← Back to my Post-Its
            </router-link>
        </div>

        <div class="rounded-lg shadow-xl/30 w-full md:w-[75%] mx-auto p-6 bg-yellow-100 border-1 border-yellow-500">
            <form @submit.prevent="updater" class="flex flex-col gap-4">
                <input
                    class="border border-gray-300 rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    v-model="myTitle" placeholder="Edit title" />
                <textarea
                    class="border border-gray-300 rounded px-4 py-2 text-gray-800 resize-none h-40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    v-model="myDesc" placeholder="Edit description"></textarea>
                <div class="flex justify-end space-x-3">
                    <button
                        class="px-4 py-2 bg-gray-300 cursor-pointer rounded-xl hover:bg-gray-400 hover:shadow-xl transition-shadow duration-400">
                        <router-link :to="`/note/${myId}`">Cancel</router-link>
                    </button>
                    <button type="submit"
                        class="self-end bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition">
                        Update
                    </button>

                </div>
            </form>
        </div>
    </main>
</template>
