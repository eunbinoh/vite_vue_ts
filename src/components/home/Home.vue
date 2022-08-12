<template>
  <header>
    <h1>{{ today }} _TODO LIST</h1>
    <p>Author_ nonbi</p>
  </header>
  <main>

    <router-link to="/calendar" class="goBtn">Go MyCalendar</router-link>

    <TodoInput :item="content.todoText" @input="updateTodoText" @add="addTodoItem" />
    <div class="todoList">
      <ul>
        <TodoList
          v-for="(todoItem, index) in content.todoItems"
          :key="index"
          :index="index"
          :todoItem="todoItem"
          @toggle="toggleComplete"
          @remove="removeItem"
        />
      </ul>
    </div>

  </main>
</template>

<script setup lang='ts'>
import TodoInput from '@/components/todo/TodoInput.vue'
import TodoList from '@/components/todo/TodoList.vue'
import MyCalendar from '@/components/calendar/MyCalendar.vue'

import dayjs from 'dayjs'
import 'bulma/css/bulma.css'
import { reactive } from 'vue'


const today = dayjs().format('MM/DD')

const content = reactive({
  todoText: '',
  todoItems: [] as Todo[],
})

const addTodoItem = () => {
  const value = content.todoText
  const todo: Todo = {
    title: value,
    done: false,
  }

  content.todoItems.push(todo)
  storage.save(content.todoItems)
  initTodoText()
}

const initTodoText = () => {
  content.todoText = ''
}

const updateTodoText = (value: string) => {
  if (typeof value === 'string') {
    content.todoText = value
  }
}
const STORAGE_KEY = 'vue-ts-storage1'
const storage = {
  save(todoItem: Todo[]) {
    const parsed = JSON.stringify(todoItem)
    localStorage.setItem(STORAGE_KEY, parsed)
  },
  fetch(): Todo[] {
    const todoItems = localStorage.getItem(STORAGE_KEY) || '[]'
    return JSON.parse(todoItems)
  },
}

const fetchTodoItems = () => {
  // 윗줄에 있는 const storage = { fetch():{} 에서 가져온 storage.fetch() }
  content.todoItems = storage.fetch().sort((a, b) => {
    if (a.title > b.title) {
      return 1
    } else if (a.title < b.title) {
      return -1
    } else {
      return 0
    }
  })
}

const toggleComplete = (todoItem: Todo, index: number) => {
  content.todoItems.splice(index, 1, { ...todoItem, done: !todoItem.done })
}

const removeItem = (index: number) => {
  content.todoItems.splice(index, 1)
  storage.save(content.todoItems)
}

fetchTodoItems()

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
  }
  & p {
    font-size: 20px;
    text-align: right;
    margin-right: 20px;
  }
}

main {
  font-family: "Stylish", sans-serif;
  text-align: center;
  margin-top: 20px;
  & .goBtn {
    position: sticky;
    margin-left: 91%;
    color: #9270a3;
    background-color: white;
    border-radius: 5px;
    border: 2px solid #9270a3;
    padding: 5px 5px 5px 5px;
  }
  & .goBtn:hover {
    cursor: pointer;
    margin-left: 90%;
    font-weight: bold;
    color: white;
    background-color: #9c7bac85;
    border-radius: 5px;
    border: 1px solid #9c7bac85;
  }
}

.todoList {
  display: flex;
  justify-content: center;
}

</style>
