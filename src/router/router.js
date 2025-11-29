import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue"
import editPage from "@/components/editPostIt.vue"
import edit from "@/components/edit.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },

    {
        path: "/note/:id",
        name: "note",
        component: editPage,
        props: true,
    },

    {
        path: "/edit/:id",
        name: "edit",
        component: edit,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;