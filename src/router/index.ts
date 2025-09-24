import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import CreateSurvey from '@/views/CreateSurvey.vue'
import SurveyList from '@/views/SurveyList.vue'
import SurveyDetail from '@/views/SurveyDetail.vue'
import DeleteSurvey from '@/views/DeleteSurvey.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/create'
  },
  {
    path: '/create',
    name: 'CreateSurvey',
    component: CreateSurvey,
    meta: { requiresAuth: true }
  },
  {
    path: '/list',
    name: 'SurveyList',
    component: SurveyList,
    meta: { requiresAuth: true }
  },
  {
    path: '/detail',
    name: 'SurveyDetail',
    component: SurveyDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/delete',
    name: 'DeleteSurvey',
    component: DeleteSurvey,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  // 如果访问登录页面且已登录，重定向到首页
  if (to.path === '/login' && isLoggedIn) {
    next('/')
    return
  }
  
  // 如果访问需要认证的页面且未登录，重定向到登录页
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
    return
  }
  
  next()
})

export default router
