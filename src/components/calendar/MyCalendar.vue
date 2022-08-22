<template>
<Header/>
<main>
    <div class="main_container">
        <div class="left_box_container">
            <CalendarNav :year="yearMonth.year" :month="yearMonth.month" @moveToYm="moveToYearMonth"/>
        </div>
        <div class="right_box_container">
           <CalendarContent :year="yearMonth.year" :month="yearMonth.month" />
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import Header from '@/components/home/header.vue'
import CalendarNav from './calendarNav.vue';
import CalendarContent from './CalendarContent.vue';
import { currentYr ,currentMonth} from './today';
import { reactive, watch } from 'vue';

// provide('month', yearMonth.month)

const yearMonth = reactive<{
    year : number,
    month : number
}>({
    year : currentYr,
    month : currentMonth
})

function moveToYearMonth(y:number, m:number) {
    yearMonth.month = m
    yearMonth.year = y
}

</script>

<style scoped lang="scss">
@import "@/assets/style/main_style.scss";
.main_container{
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
.left_box_container{
    // margin-left: 50px;
    // font-family: "Stylish", sans-serif;
    margin-top: 35px;
    line-height: 60px;
}
.right_box_container{
    width: 1000px;
}
</style>