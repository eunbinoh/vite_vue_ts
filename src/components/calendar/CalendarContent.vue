<template>
  <section class="section">
    <div class="container">
      <div class="content_box ">
        <div class="content_grid weeks">
            <div v-for="w in weeks" class="" :class="{'hDay':w==='SUN'}">{{ w }}</div>
        </div>
        <div class="content_grid days">
            <div v-for="d in dates" class="dayBox" >
              <div class="days_date" :class="{'oDay': !d.isCurrMonth, 'hDay': d.isHoliDay }"> 
                {{ d.date }} 
                <div :class="{'days_todo': d.todo }"> 
                  <router-link to="/todo" class="routerTodo"> {{ d.todo }} </router-link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  year : number,
  month : number,
}>(), {})

const year = ref(props.year);
const month = ref(props.month);
const weeks = ['SUN', 'MON', 'TUE','WED','THU','FRI','SAT'];

const dates = reactive<Dates[]>([])

watch ( props,
    (n) => {
      year.value = n.year
      month.value = n.month

      initDate();
      initCalendarData();
    }
)

let monthFDay = 0;     // 당월 시작 요일
let monthLDate = 0;    // 당월 마지막 날짜
let preMonthLDate = 0; // 전월 마지막 날짜

onMounted(initCalendarData)

function initDate() {
  monthFDay = monthLDate = preMonthLDate = 0;
  dates.length = 0;  // Object.assign(dates, null)
}

function initCalendarData () {
  [monthFDay,monthLDate,preMonthLDate] = getDate(year.value, month.value);   // 시작일, 시작요일, 말일 세팅
    getDayOfMonths(monthFDay, monthLDate, preMonthLDate); // 당월 날짜 세팅
}

function getDate(year: number, month: number) {
  const firstDay = new Date(year, month-1, 1).getDay();  //월 시작 요일
  const lastDate = new Date(year, month, 0).getDate(); //월 마지막 일자
  let lastYr = year;       //전년도
  let lastMon = month -1;  //전달
  if (month === 1) {
    lastYr  = year-1; 
    lastMon = 12;
  }
  const preLastDate = new Date(lastYr, lastMon, 0).getDate(); // 전달 마지막 일자

  return [firstDay,lastDate,preLastDate] ;
}

// 당월 날짜 세팅
function getDayOfMonths(monthFDay:number, monthLDate:number, preMonthLDate:number) {
  let preDay = preMonthLDate - monthFDay +1; //전월 마지막일자 - 당월 시작요일 ( 전월 마지막주 시작일자) 
  // 전월 마지막주간 날짜 데이터 넣기
  for(let i=0; i <= monthFDay-1; i++){
      dates.push({
        date : preDay,
        isHoliDay : false,
        isCurrMonth : false
      })
      preDay++;
  } 

  // 당월 날짜 데이터 넣기
  for(let d=1; d<= monthLDate; d++) {
      dates.push({
        date : d,
        todo : d === 29 ? 'PAY DAY' : '', // 가데이터
        isHoliDay : new Date(year.value,month.value-1,d).getDay() === 0? true : false,
        isCurrMonth : true
      })
  }

  // 다음달 날짜 데이터 넣기
  const lastDay = new Date(year.value,month.value-1,monthLDate).getDay();
  if( lastDay === 6) return; 
  // 말일이 토요일인 Full Week 빼고, 다음달 날짜 미리보기 세팅

  for(let i=1; i < 7-lastDay; i++){
      dates.push({
        date : i,
        isHoliDay : false,
        isCurrMonth : false
      })
  } 
  
}


</script>
 
<style scoped lang="scss">    
  .content_box {
    width: 100%;
  }
  .content_grid {
    display: grid;
    grid-template-columns: repeat(7,1fr);
    border-bottom: 1px solid rgb(209, 208, 208);
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .weeks {
    // text-align: center;
    font-size: 18px;
    padding-bottom: 10px;
  }
  .days {
    text-align: start;
    font-size: 18px;
    padding-left: 10px;
    & .dayBox {
      height: 95px;
    }
  }

  .hDay {
    color: crimson;
  }
  .oDay {
    opacity: 30%;
  }
  .weekDays {
    text-align: center;
  }
  .days_date {
    padding-bottom: 50px;
  }
  .days_todo {
    text-decoration: none;
    width: 95%;
    height: 100%;
    padding-left: 10px;
    border: 1px solid plum;
    border-radius: 5px;
    color: #9270a3;
  }
  .routerTodo:hover {
    cursor: pointer;
    font-weight: bold;
    color: white;
    background-color: #9c7bac85;
    border-radius: 5px;
    border: 1px solid #9c7bac85;
  }

</style>