<template>
  <div class="header_number">
    <h1 class="header_year"> {{ year }} </h1>
    <h1 class="header_month"> {{ month }} </h1>        
  </div>
  <div class="header_btn">
      <button id="preMonBtn" @click="moveToPre"> &lt; </button>
      <button id="nextMonBtn" @click="moveToNext"> > </button>
  </div>
 
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    year : number,
    month : number 
}>(), {})

const year = ref(props.year)
const month = ref(props.month)

const emit = defineEmits(['moveToYm'])

function moveToPre() {
  --month.value
  if (month.value < 1){
    --year.value
    month.value = 12
  }
  emit('moveToYm', year.value, month.value)
}
function moveToNext() {
  ++month.value
  if (month.value > 12){
    ++year.value
    month.value = 1
  }
  emit('moveToYm', year.value, month.value)
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