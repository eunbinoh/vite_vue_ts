<template>
  <header>
    <h1><router-link to="/"> My Work Diary ( {{ today }} ) </router-link> </h1>
    <p>Author_ nonbi</p>
  </header>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import 'bulma/css/bulma.css'

const today = dayjs().format('MM/DD')
</script>

<style scoped lang="scss">
@import "@/assets/style/main_style.scss";
</style>