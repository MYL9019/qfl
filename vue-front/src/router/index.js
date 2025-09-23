import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import SurveyForm from '@/components/SurveyForm.vue'
import SurveyHistory from '@/components/SurveyHistory.vue'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/survey-form',
    name: 'SurveyForm',
    component: SurveyForm
  },
  {
    path: '/survey-history',
    name: 'SurveyHistory',
    component: SurveyHistory
  },
  {
    path: '/survey-management',
    name: 'SurveyManagement',
    component: () => import('@/components/SurveyManagement.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
