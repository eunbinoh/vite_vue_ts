<template>

<div class="main_container">
    <div class="left_box_container">
        <h1 class="header_txt_month"> {{ year }} </h1>
        <h1 class="header_number_month"> {{ month }} </h1>        
        <div class="header_btn">
            <button id="preMonBtn" @click="moveTo"> &lt; </button>
            <button id="nextMonBtn" @click="moveTo"> > </button>
        </div>
    </div>
    <div class="right_box_container">
        <section class="section">
            <div class="container">
                <table class="table has-text-centered is-fullwidth">
                    <thead>
                        <th v-for="w in weeks" :key="w" class="weekDays" :class="{'hDay':w==='SUN'}">{{ w }}</th>
                    </thead>
                    <tbody>
                        <tr v-for="(date, i) in dates" :keys="i" class="days_tr" >
                            <td v-for="(d, j) in date" :key="j" class="days_td" 
                                :class="{'hDay' : d == date[0], 'gDay' : isNotMonth(date, d)}">
                                {{ d }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';


const weeks = ['SUN', 'MON', 'TUE','WED','THU','FRI','SAT'];
const today = new Date();
let dates = [] as number[][];

let year = 0;
let month = 0;

let monthFDay = 0;
let monthLDate = 0;
let preMonthLDate = 0;

// onMounted(initDate);
// function initDate(){// }


calendarData();
function calendarData () {
    year = today.getFullYear();
    month = today.getMonth()+1 +1;

    [monthFDay,monthLDate,preMonthLDate] = getDate(year, month);
     dates = getMonthOfDays(monthFDay, monthLDate, preMonthLDate);
    
}

function getDate(year: number, month: number) {
    const firstDay = new Date(year, month, -1, 1).getDay(); //월 시작 요일
    const lastDate = new Date(year, month, 0).getDate();    //월 마지막 일자
    let lastYr = year;   //전년도
    let lastMon = month -1;  //전달
    if(month === 1) {
        lastYr = year-1; 
        lastMon = 12;
    }
    const preLastDate = new Date(lastYr, lastMon, 0).getDate(); // 전달 마지막 일자

    return [firstDay,lastDate,preLastDate] ;
}

function getMonthOfDays(monthFDay:number, monthLDate:number, preMonthLDate:number) {
    const dates : number[][] = [];
    let weekOfDays : number[] = [];
    let day = 1;  // 1일이 무슨요일인지 구해서 순차적 배열
    let preDay = preMonthLDate - monthFDay +1; //전월 마지막일자 요일

    while(day <= monthLDate) {
        if (day === 1){
            for(let i=0; i < monthFDay-1; i++){
                weekOfDays.push(preDay);
                preDay++;
            } // 1일 기준으로 전달의 마지막 주간 구하기
        }

        weekOfDays.push(day); //주간마다 날짜 넣어주기
        if(weekOfDays.length === 7) {
            dates.push(weekOfDays);
            weekOfDays = []; //한 주 끝나면 주간 데이터 리셋
        }
        day++;
    }

    // 나머지 칸에 다음달 날짜 넣어주기
    const len = weekOfDays.length;
    if(len>0 && len<7){
        for(let i=1; i<=7-len; i++){
            weekOfDays.push(i);
        }
    }
    if(len>0) dates.push(weekOfDays); // 나머지 날짜 세팅
    
    return dates;
}

function isNotMonth(date: number[], d: number) {
    // console.log(dates)
    if(date[0] === dates[0][0] && dates[0].indexOf(1)-1 !== -1){ //월 시작일이 일요일,1일 이면 제외
        if (d === dates[0][(dates[0].indexOf(1)-1)]) return true;
        else return false;
    }

    let lastW = dates.length-1; //마지막주

    if ( dates[lastW] === date ) {
        let findDay = dates[lastW][(dates[lastW].indexOf(1))]
        for(let i=1; i <= 7-findDay; i++){
            if (d === dates[lastW][(dates[lastW].indexOf(i))]) return true;
            else false;
        }
    }
    
}


function moveTo() {
    // $emit('moveTo')
    console.log()
}


    

</script>

<style scoped lang="scss">
.main_container{
    margin-top: 10px;
    display: flex;
}
.left_box_container{
    margin-left: 50px;
    margin-top: 35px;
    font-family: "Stylish", sans-serif;
    line-height: 60px;
    
    & .header_txt_month {
        font-weight: 500;
        font-size: x-large;
    }

    & .header_number_month {
        margin-top: 30px;
        font-size: 120px;
    }

    & .header_btn {
        margin-top: 60px;
        display: flex;
        justify-content: center;

        & button {
            background-color: whitesmoke;
            border: 1px solid rgb(209, 208, 208);
            border-radius: 10px;

            font-family: "Stylish", sans-serif;
            font-size:25px;

            width: 40px;
            padding: 0 5px 0 5px;
            margin-left: 10px;

        }
        & button:hover {
            color: white;
            background-color: grey;
            cursor: pointer;
        }
        
    }
}

.right_box_container{
    width: 1000px;

    & .hDay {
        color: crimson;
    }
    & .gDay {
        opacity: 30%;
    }
    & .weekDays {
        text-align: center;
    }
    & .days_td {
        padding-bottom: 50px;
    }
}
</style>