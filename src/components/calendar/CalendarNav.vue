<template>
  <div class="header_number">
    <h1 class="header_year"> {{ year }} </h1>
    <h1 class="header_month"> {{ month }} </h1>        
  </div>
  <div class="header_btn">
      <button id="preMonBtn" @click="moveTo"> &lt; </button>
      <button id="nextMonBtn" @click="moveTo"> > </button>
  </div>
 
</template>

<script setup lang="ts">
import { today, todayYr ,todayMonth} from './today';

const year = todayYr
const month = todayMonth

function moveTo() {

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