import { createRouter, createWebHistory } from 'vue-router'
import CounterView from '@/views/CounterView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/UserStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AboutView,
      meta: { requiresAuth: true }
    },
    {
      path: '/Login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

// Navigation guard global
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.userConnected) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
