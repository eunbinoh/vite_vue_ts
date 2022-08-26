<template>
<Header/>
<main>
    <div class="main_container">
        <div class="left_box_container">
            <CalendarNav v-model="yearMonth" />
        </div>
        <div class="right_box_container">
           <CalendarContent :yearMonth="yearMonth" />
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import Header from '@/components/home/header.vue'
import CalendarNav from './calendarNav.vue';
import CalendarContent from './CalendarContent.vue';
import { currentYr ,currentMonth} from './today';
import { reactive } from 'vue';

// provide('month', yearMonth.month)

const yearMonth = reactive<{
    year : number,
    month : number
}>({
    year : currentYr,
    month : currentMonth
})


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