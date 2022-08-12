<template>
  <header>
    <h1> My Work Diary ( {{ today }} )</h1>
    <p>Author_ nonbi</p>
  </header>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import 'bulma/css/bulma.css'

const today = dayjs().format('MM/DD')
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Stylish&display=swap");
header {
  font-family: "Stylish", sans-serif;
  background-color: #9c7bac85;
  color: aliceblue;

  & h1 {
    font-size: 30px;
    text-align: center;
    margin-top: 10px;
  }
  & p {
    font-size: 20px;
    text-align: right;
    margin-right: 20px;
  }
}
</style>