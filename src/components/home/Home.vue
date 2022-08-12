<template>
  <Header/>
  <main>
    <router-link to="/calendar" class="goBtn">Go MyCalendar</router-link>
    <router-link to="/todo" class="goBtn">Go MyTodo</router-link>
  </main>
</template>

<script setup lang='ts'>
import Header from './header.vue'
import 'bulma/css/bulma.css'

</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Stylish&display=swap");
main {
  font-family: "Stylish", sans-serif;
  text-align: center;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  & .goBtn {
    position: sticky;
    color: #9270a3;
    background-color: white;
    border-radius: 5px;
    border: 2px solid #9270a3;
    padding: 5px 5px 5px 5px;
  }
  & .goBtn:hover {
    cursor: pointer;
    font-weight: bold;
    color: white;
    background-color: #9c7bac85;
    border-radius: 5px;
    border: 1px solid #9c7bac85;
  }
}

</style>
