<template>
 <section class="section">
    <div class="container">
        <table class="table has-text-centered is-fullwidth">
            <thead>
                <th v-for="w in weeks" :key="w" class="weekDays" :class="{'hDay':w==='SUN'}">{{ w }}</th>
            </thead>
            <tbody>
                <tr v-for="d in dates"  class="days_tr" >
                    <td v-for="(dw, i) in d.week" :key="dw" class="days_td">
                        {{ d.date }}
                        <!-- :class="{'hDay' : d == dates[0], 'gDay' : isNotMonth(dates, d)}"> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>
 
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { weekends, todayYr, todayMonth, getDate} from './today';

  const year = todayYr;
  const month = todayMonth;
  const weeks = weekends;


  interface Dates {
    week? : number[]
    date? : number | Date
    todo?  : string
    isHoliDay? : boolean
    isCurrMonth? : boolean
  }

  let dates = reactive<Dates[]>([{
    isHoliDay   = false,
    isCurrMonth = true
  }])
  // let dates = [] as number[][];

  onMounted(calendarData);
  let monthFDay = 0;     // 당월 시작 요일
  let monthLDate = 0;    // 당월 마지막 날짜
  let preMonthLDate = 0; // 전월 마지막 날짜

  function calendarData () {
    [monthFDay,monthLDate,preMonthLDate] = getDate(year, month);   // 시작일, 시작요일, 말일 세팅
     dates = getMonthOfDays(monthFDay, monthLDate, preMonthLDate); // 당월 날짜 세팅
      console.log(222,monthFDay)
  }

  // 당월 날짜 세팅
  function getMonthOfDays(monthFDay:number, monthLDate:number, preMonthLDate:number) {
    let weekOfDays : number[] = [];
    let day = 1;  // 1일이 무슨요일인지 구해서 순차적 배열
    let preDay = preMonthLDate - monthFDay +1; //전월 마지막일자 요일

    for(let day=1; day <= monthLDate; day++) {
        if (day === 1){
            for(let i=0; i < monthFDay-1; i++){
                weekOfDays.push(preDay);
                dates[preDay].isCurrMonth = false;
                preDay++;
            } // 1일 기준으로 전달의 마지막 주간 구하기
        }

        weekOfDays.push(day); //주간마다 날짜 넣어주기
        if(weekOfDays.length === 7) {
            dates[day].week = weekOfDays;

            console.log('date[d].week',dates[day].week)

            weekOfDays = []; //한 주 끝나면 주간 데이터 리셋
        }
    }

    // 나머지 칸에 다음달 날짜 넣어주기
    const len = weekOfDays.length;
    if(len>0 && len<7){
      for(let i=1; i<=7-len; i++){
        weekOfDays.push(i);
      }
    }
    if(len>0) dates[day].week = weekOfDays; // 나머지 날짜 세팅
    
    return dates;
  }

  // 당월이 아닌 전월, 후월만 True 리턴
//   function isNotMonth(date: number[], d: number) {
//     // if(date[0] === dates[0][0] && dates[0].indexOf(1)-1 !== -1){ //월 시작일이 일요일,1일 이면 제외
//     // console.log(monthFDay)
//       for(let i=0; i<2; i++){
//         if (d === dates[0][(dates[0].indexOf(1)-1)]) return true;
//         else return false;
//       // }
//     }

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