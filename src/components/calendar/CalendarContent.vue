<template>
  <section class="section">
    <div class="container">
        <div class="content_box ">
            <div class="content_grid weeks">
                <th v-for="w in weeks" class="" :class="{'hDay':w==='SUN'}">{{ w }}</th>
            </div>
            <div class="content_grid days">
                <div v-for="(d, i) in dates" class="dayBox" >
                    <div class="days_td"> {{ d.date }} </div>
                    <!-- :class="{'hDay' : d == dates[0], 'gDay' : isNotMonth(dates, d)}"> -->
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { weekends, todayYr, todayMonth } from './today';

  const year = todayYr;
  const month = todayMonth;
  const weeks = weekends;

  interface Dates {
    date? : number | Date
    todo?  : string
    isHoliDay? : boolean
    isCurrMonth? : boolean
  }

  const dates = reactive<Dates[]>([])
  // let dates = [] as number[][];

  onMounted(initCalendarData);
  let monthFDay = 0;     // 당월 시작 요일
  let monthLDate = 0;    // 당월 마지막 날짜
  let preMonthLDate = 0; // 전월 마지막 날짜

  
  function initCalendarData () {
    [monthFDay,monthLDate,preMonthLDate] = getDate(year, month);   // 시작일, 시작요일, 말일 세팅
     getDayOfMonths(monthFDay, monthLDate, preMonthLDate); // 당월 날짜 세팅
  }

  function getDate(year: number, month: number) {
    const firstDay = new Date(year, month-1, 1).getDay(); //월 시작 요일
    const lastDate = new Date(year, month-1, 0).getDate();    //월 마지막 일자
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
          todo : '',
          isHoliDay : false,
          isCurrMonth : false
        })
        preDay++;
    } 

    // 당월 날짜 데이터 넣기
    for(let d=1; d<= monthLDate; d++) {
        dates.push({
          date : d,
          todo : '',
          isHoliDay : new Date(year,month,d).getDay() === 0? true : false,
          isCurrMonth : true
        })
    }

    // 나머지 칸에 다음달 날짜 넣어주기
    // const len = weekOfDays.length;
    // if(len>0 && len<7){
    //   for(let i=1; i<=7-len; i++){
    //     weekOfDays.push(i);
    //   }
    // }
    // if(len>0) dates[day].week = weekOfDays; // 나머지 날짜 세팅
    
  }

  // 당월이 아닌 전월, 후월만 True 리턴
//   function isNotMonth(date: number[], d: number) {
//     let lastW = dates.length-1; //마지막주
//     if ( dates[lastW] === date ) {
//         let findDay = dates[lastW][(dates[lastW].indexOf(1))]
//         for(let i=1; i <= 7-findDay; i++){
//             if (d === dates[lastW][(dates[lastW].indexOf(i))]) return true;
//             else return false;
//         }
//     }
// }
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
    text-align: center;
    font-size: 18px;
    padding-bottom: 10px;
  }
  .days {
    text-align: start;
    font-size: 18px;
    padding-left: 30px;
    & .dayBox {
      height: 95px;
    }
  }

  .hDay {
    color: crimson;
  }
  .gDay {
    opacity: 30%;
  }
  .weekDays {
    text-align: center;
  }
  .days_td {
    padding-bottom: 50px;
  }
</style>