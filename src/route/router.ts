// 라우터 패키지 가져오기
import { createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import  MyCalenar from '@/components/calendar/MyCalendar.vue';
import  TodoApp from '@/components/todo/TodoApp.vue';
import Home from '@/components/home/Home.vue';

const routes :RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'MyCalenar',
    path: '/calendar',
    component:  MyCalenar,
  },
  {
    name: 'TodoApp',
    path: '/todo',
    component:  TodoApp,
  },

]

const router = createRouter({
  history : createWebHashHistory(),
  routes
})

export default router;