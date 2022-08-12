// 라우터 패키지 가져오기
import { createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import  MyCalenar from '@/components/calendar/MyCalendar.vue';
import  MyCalenar2 from '@/components/calendar/MyCalendar2.vue';

const routes :RouteRecordRaw[] = [
  // {
  //   name: 'App',
  //   path: '/',
  //   component: () => import('@/App.vue'),
  // },
  {
    name: 'Home',
    path: '',
    component: () => import('@/components/home/Home.vue'),
    // children: [
    //   {
    //     name: 'MyCalenar',
    //     path: '/calendar',
    //     // component:  MyCalenar,
    //     component:  () => import('@/components/calendar/MyCalendar.vue'),
    //   },
    //   {
    //     name: 'MyCalenar2',
    //     path: '/aaa',
    //     component: MyCalenar2,
    //     // component:  () => import('@/components/calendar/MyCalendar2.vue'),
    //   }
    // ]
  },
  {
    name: 'MyCalenar',
    path: '/calendar',
    component:  MyCalenar,
    // component:  () => import('@/components/calendar/MyCalendar.vue'),
  },
  {
    name: 'MyCalenar2',
    path: '/calendar2',
    component: MyCalenar2,
    // component:  () => import('@/components/calendar/MyCalendar2.vue'),
  }
]

const router = createRouter({
  history : createWebHashHistory(),
  routes
})

export default router;