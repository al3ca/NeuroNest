<script setup>
import { ref } from 'vue'
import Navbar from "@/components/Navbar.vue"
import Home from "@/components/Home.vue"
import Foot_er from "@/components/footer.vue"

</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Navbar />
        <RouterView/>
        <Foot_er />
    </div>
</template>
