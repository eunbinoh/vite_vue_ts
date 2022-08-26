<template>
  <div class="header_number">
    <h1 class="header_year"> {{ modelValue.year }} </h1>
    <h1 class="header_month"> {{ modelValue.month }} </h1>        
  </div>
  <div class="header_btn">
      <button id="preMonBtn" @click="moveYearMonth(-1)"> &lt; </button>
      <button id="nextMonBtn" @click="moveYearMonth(1)"> > </button>
  </div>
 
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';

const props = defineProps<{
  modelValue: {
    year: number,
    month: number
  }
}>()

// const props = withDefaults(defineProps<{
//   yearMonth : {year : number, month : number}
// }>(), {})
  // let year :number = props.yearMonth.year
  // let month :number = props.yearMonth.month

const emit = defineEmits<{
  (e: 'update:modelValue', value: { year: number, month: number }): void
}>()

watchEffect(() => {
  emit('update:modelValue', props.modelValue)
})

/**
 * 이전달 이동 / 다음달 이동
 * @param clacNum +1 / -1
 */
function moveYearMonth(clacNum: number) {
  let setNum = (props.modelValue.month === 12 && clacNum == 1)? -11 : (props.modelValue.month === 1 && clacNum == -1? 11 : clacNum )
  if (Math.abs(setNum) === 11 ) props.modelValue.year += clacNum  // month 12++ || 1--  -> year +1 / -1

  props.modelValue.month += setNum
}


</script>
 
<style scoped lang="scss">
  .header_number {
    margin-left: 10px;

    & .header_year {
      font-weight: 500;
      font-size: x-large;
      margin-top: 5px; 
    }
  
    & .header_month {
      margin-top: 30px;
      font-size: 120px;
    }
  }

  .header_btn {
      margin-top: 60px;
      display: flex;
      justify-content: flex-start;

      & button {
          background-color: whitesmoke;
          border: 1px solid rgb(209, 208, 208);
          border-radius: 10px;

          font-family: "Stylish", sans-serif;
          font-size:25px;

          width: 40px;
          padding: 0 5px 0 5px;
          margin-right: 10px;

      }
      & button:hover {
          color: white;
          background-color: #9c7bac85;
          cursor: pointer;
      }
  }
 </style>