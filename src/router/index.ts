import { createRouter, createWebHistory } from 'vue-router'
import CreateSurvey from '@/views/CreateSurvey.vue'
import SurveyList from '@/views/SurveyList.vue'
import SurveyDetail from '@/views/SurveyDetail.vue'
import DeleteSurvey from '@/views/DeleteSurvey.vue'

const routes = [
  {
    path: '/',
    redirect: '/create'
  },
  {
    path: '/create',
    name: 'CreateSurvey',
    component: CreateSurvey
  },
  {
    path: '/list',
    name: 'SurveyList',
    component: SurveyList
  },
  {
    path: '/detail',
    name: 'SurveyDetail',
    component: SurveyDetail
  },
  {
    path: '/delete',
    name: 'DeleteSurvey',
    component: DeleteSurvey
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
