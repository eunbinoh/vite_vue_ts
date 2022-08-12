// 라우터 패키지 가져오기
import { createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'


const routes :RouteRecordRaw[] = [
  {
    name: 'App',
    path: '/',
    component: () => import('@/App.vue'),
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/components/home/Home.vue'),
    children: [
      {
        name: 'MyCalenar',
        path: '/myCalendar',
        component:  () => import('@/components/calendar/MyCalendar.vue'),
      },
      {
        name: 'MyCalenar2',
        path: '/myCalendar2',
        component:  () => import('@/components/calendar/MyCalendar2.vue'),
      }
    ]
  },
    
]

const router = createRouter({
  history : createWebHashHistory(),
  routes
})

export default router;