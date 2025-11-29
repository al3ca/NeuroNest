<script setup>
import { ref } from 'vue'
import Cards from "@/components/cards.vue"
import Modale from "@/components/Modale.vue"
import DeleteModale from "@/components/deleteModale.vue"


const showModal = ref(false)
const showCreateModal = ref(false)
const showDeleteModal = ref(false)


function openModal() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

</script>

<template>
    <main class="flex-grow">
        <Cards @open-create="showCreateModal = true" @open-delete="showDeleteModal = true" />
        <Modale v-if="showCreateModal" @close="showCreateModal = false" />
        <DeleteModale v-if="showDeleteModal" @close="showDeleteModal = false" />
    </main>
</template>
