<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { usePostItStore } from '@/stores/postitStore'
import router from '@/router/router'

const piniaStore = usePostItStore()
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

const deleteOne = () => {
    if (confirm("Do you really want to delete this post-it?")) {
        piniaStore.deletePostItById(myId.value)
        router.push(`/`)
    }
}
</script>

<template>
    <main class="flex-grow p-5 m-5">
        <div class="w-full md:w-[75%] mx-auto mb-6">
            <router-link :to="`/`"
                class="inline-flex items-center text-gray-600 text-sm italic hover:text-blue-600 transition">
                ← Back to my Post-Its
            </router-link>
        </div>
        <div class="rounded-lg shadow-xl/30 w-full md:w-[75%] mx-auto p-6 bg-yellow-100 border-1 border-yellow-500">
            <div class="flex items-center justify-between mb-4">
                <h1 class="font-semibold text-3xl">{{ myTitle }}</h1>
                <div class="flex items-center gap-5">
                    <button class=" text-black hover:text-red-600 cursor-pointer" @click="deleteOne">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                    <router-link :to="`/edit/${myId}`" class=" text-black hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                    </router-link>
                </div>
            </div>
            <p class="text-align whitespace-pre-line">{{ myDesc }}</p>


        </div>
        <!-- <div>
            <form @submit.prevent="updater">
                <input class="border" v-model="myTitle" placeholder="Title" />
                <input class="border" v-model="myDesc" placeholder="Description" />
                <button type="submit">Update</button>
            </form>
        </div> -->
    </main>
</template>
