import { createWebHistory, createRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'

/**
 * Lazy-loaded views for code splitting
 * Improves initial page load performance
 */
const HomeView = defineAsyncComponent(() => import('@/views/HomeView.vue'))
const NoteDetailView = defineAsyncComponent(() => import('@/views/NoteDetailView.vue'))
const NoteEditView = defineAsyncComponent(() => import('@/views/NoteEditView.vue'))

/**
 * Application routes
 * Organized in logical sections
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'NeuroNest - My Notes',
      description: 'View and manage all your notes'
    }
  },
  {
    path: '/note/:id',
    name: 'note-detail',
    component: NoteDetailView,
    props: true,
    meta: {
      title: 'View Note',
      description: 'View note details'
    }
  },
  {
    path: '/edit/:id',
    name: 'note-edit',
    component: NoteEditView,
    props: true,
    meta: {
      title: 'Edit Note',
      description: 'Edit your note'
    }
  },
  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

/**
 * Create router instance with history mode
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Smooth scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

/**
 * Navigation guard to update page title
 */
router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'NeuroNest'
  document.title = title
  next()
})

export default router
