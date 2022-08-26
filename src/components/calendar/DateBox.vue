<template>
  <div class="days_date" :class="{'oDay': !d.isCurrMonth, 'hDay': d.isHoliDay }"> 
    <div> {{ d.date }} </div> 
    <div :class="{'days_todo': d.todo }"> 
      <router-link to="/todo" class="routerTodo"> {{ d.todo }} </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  d : Dates
}>()

</script>
 
<style scoped lang="scss">    
  .hDay {
    color: crimson;
  }
  .oDay {
    opacity: 30%;
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