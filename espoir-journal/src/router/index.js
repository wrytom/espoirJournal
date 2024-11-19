import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OnboardingView from '@/views/OnboardingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: OnboardingView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal')) || {}
  if (espoirJournal.onboarding !== true && to.name !== 'onboarding') {
    next({ name: 'onboarding' })
  } else {
    next()
  }
})

export default router


