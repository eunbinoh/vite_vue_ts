// 라우터 패키지 가져오기
import { createRouter, createWebHashHistory} from 'vue-router'
// 라우터를 위해 컴포넌트 가져오기
import TodoInput from './TodoInput'
import Calendar2 from './MyCalendar'
import Calendar from './MyCalendar2'

// 내보내기
export default createRouter({
  // Hash
  // https://google.com/#/search
  // hash 모드를 사용(중간의 /#/이 추가된다.), 페이지를 새로고침하였을때 404에러를 방지해준다.
  // history 모드도 있지만 간단한 처리를 위해서 hash를 사용하였다.(서버쪽에 설정을 추가해 줘야한다.)
  history: createWebHashHistory(),

  // pages: 페이지를 관리할때 사용되는 옵션
  // https://google.com/
  // url에 입력값에 따라 실행될 컴포넌트 지정
  routes: [
    {
      path: './TodoInput',
      component: TodoInput
    },
    {
      path: './MyCalendar',
      component: Calendar
    },
    {
      path: './MyCalendar2',
      component: Calendar2
    }
  ]
})