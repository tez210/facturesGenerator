import { createRouter, createWebHistory } from 'vue-router'
import FacturesView from '@/views/FacturesView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Factures',
      name: 'factures',
      component: FacturesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/Login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/factures'
    }
  ],
})

// Navigation guard global
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { userConnected } = storeToRefs(userStore)

  if (to.name == "login" && userConnected.value) {
    next({ name: 'factures' })
  }

  if (to.meta.requiresAuth && !userConnected.value) {
    console.log("utilisateur deconnecté")
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
